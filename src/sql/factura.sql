---------------------------------------------Funciones para la factura--------------------------------------------------


-----------------------------------------Funciones para disminuir el inventario---------------------------------------

-- Función: disminuir inventario cuando se inserta una línea de factura
CREATE OR REPLACE FUNCTION fn_disminuir_inventario()
RETURNS TRIGGER AS $$
DECLARE
    v_bodega_id INTEGER;
BEGIN
    -- Obtener la bodega de la factura
    SELECT "bodegaIdBodega"
    INTO v_bodega_id
    FROM factura
    WHERE id_factura = NEW."facturaIdFactura";

    -- Actualizar stock existente
    UPDATE existencia_bodega
    SET "cantDisponible" = "cantDisponible" - NEW.cantidad
    WHERE "itemIdItem" = NEW."itemIdItem"
      AND "bodegaIdBodega" = v_bodega_id;

    -- Verificar que sí se actualizó
    IF NOT FOUND THEN
        RAISE EXCEPTION 'No existe inventario para el item % en la bodega %',
            NEW."itemIdItem", v_bodega_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -- Trigger para factura_linea
-- DROP TRIGGER IF EXISTS trg_disminuir_inventario ON factura_linea;

CREATE TRIGGER trg_disminuir_inventario
AFTER INSERT ON factura_linea
FOR EACH ROW
EXECUTE FUNCTION fn_disminuir_inventario();



--------------------------------Funciones para calcular totales en factura--------------------------------------------------------

--Función que recalcula subtotal, descuento, impuesto y total
CREATE OR REPLACE FUNCTION actualizar_totales_factura()
RETURNS TRIGGER AS $$
DECLARE
  v_subtotal NUMERIC := 0;
  v_descuento NUMERIC := 0;
  v_impuesto NUMERIC := 0;
  v_total NUMERIC := 0;
  v_porcentaje_descuento NUMERIC;
  v_porcentaje_impuesto NUMERIC;
  v_factura_id INTEGER;
BEGIN
  -- Identificar factura afectada
  v_factura_id := COALESCE(NEW."facturaIdFactura", OLD."facturaIdFactura");

  -- 1. Calcular subtotal
  SELECT COALESCE(SUM(cantidad * "precioUnitario"), 0)
  INTO v_subtotal
  FROM factura_linea
  WHERE "facturaIdFactura" = v_factura_id;

  -- 2. Obtener porcentaje de descuento (puede ser NULL)
  SELECT "porcentajeDescuento"
  INTO v_porcentaje_descuento
  FROM factura
  WHERE id_factura = v_factura_id;

  IF v_porcentaje_descuento IS NOT NULL THEN
    v_descuento := v_subtotal * (v_porcentaje_descuento / 100);
  ELSE
    v_descuento := 0;
  END IF;

  -- 3. Obtener porcentaje de impuesto de la tabla impuesto
  SELECT i.porcentaje
  INTO v_porcentaje_impuesto
  FROM factura f
  JOIN impuesto i ON f."impuestoIdImpuesto" = i."idImpuesto"
  WHERE f.id_factura = v_factura_id;

  IF v_porcentaje_impuesto IS NOT NULL THEN
    v_impuesto := (v_subtotal - v_descuento) * (v_porcentaje_impuesto / 100);
  ELSE
    v_impuesto := 0;
  END IF;

  -- 4. Calcular total
  v_total := v_subtotal - v_descuento + v_impuesto;

  -- 5. Actualizar la factura
  UPDATE factura
  SET subtotal = v_subtotal,
      "totalDescuento" = v_descuento,
      "totalImpuesto" = v_impuesto,
      total = v_total
  WHERE id_factura = v_factura_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- --Ejecutar si el trigger ya existia en la base de datos
-- DROP TRIGGER IF EXISTS trg_actualizar_totales_factura ON factura_linea;


--Trigger que se dispara en los insert, update
CREATE TRIGGER trg_actualizar_totales_factura
AFTER INSERT OR UPDATE OR DELETE
ON factura_linea
FOR EACH ROW
EXECUTE FUNCTION actualizar_totales_factura();
