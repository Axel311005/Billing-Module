---------------------------------------------Funciones para la compra--------------------------------------------------


-----------------------------------------Funciones para aumentar el inventario---------------------------------------


-- Función: aumentar inventario cuando se inserta una línea de compra
CREATE OR REPLACE FUNCTION fn_aumentar_inventario()
RETURNS TRIGGER AS $$
DECLARE
    v_bodega_id INTEGER;
BEGIN
    -- Obtener la bodega de la compra
    SELECT "bodegaIdBodega"
    INTO v_bodega_id
    FROM compra
    WHERE "idCompra" = NEW."compraIdCompra";

    -- Actualizar stock existente
    UPDATE existencia_bodega
    SET "cantDisponible" = "cantDisponible" + NEW.cantidad
    WHERE "itemIdItem" = NEW."itemIdItem"
      AND "bodegaIdBodega" = v_bodega_id;

    -- Si no se actualizó nada, insertamos
    IF NOT FOUND THEN
        INSERT INTO existencia_bodega (
            "itemIdItem", "bodegaIdBodega", "cantDisponible",
            "existenciaMaxima", "existenciaMinima", "puntoDeReorden"
        )
        VALUES (
            NEW."itemIdItem",
            v_bodega_id,
            NEW.cantidad,
            1, 0, 1
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -- Trigger para compra_linea
-- DROP TRIGGER IF EXISTS trg_aumentar_inventario ON compra_linea;

CREATE TRIGGER trg_aumentar_inventario
AFTER INSERT ON compra_linea
FOR EACH ROW
EXECUTE FUNCTION fn_aumentar_inventario();



-- -- Crear una compra en bodega 1
-- INSERT INTO compra ("codigoCompra", estado, subtotal, total, "tipoCambioUsado", "bodegaIdBodega")
-- VALUES ('C001', 'ACTIVO', 100, 100, 1, 1)
-- RETURNING "idCompra";

-- -- Supongamos que devuelve idCompra = 10

-- -- Agregar línea de compra de item 5 con cantidad 20
-- INSERT INTO compra_linea (cantidad, "precioUnitario", "totalLinea", "compraIdCompra", "itemIdItem")
-- VALUES (20, 5, 100, 4, 3);

-- -- Verificar inventario
-- SELECT * FROM existencia_bodega WHERE "itemIdItem" = 3 AND "bodegaIdBodega" = 1;




----------------------------------Funciones para calcular totales de la compra-----------------------------------------------------------------

-- Función para recalcular totales de la compra
CREATE OR REPLACE FUNCTION actualizar_totales_compra()
RETURNS TRIGGER AS $$
DECLARE
  v_subtotal NUMERIC := 0;
  v_descuento NUMERIC := 0;
  v_impuesto NUMERIC := 0;
  v_total NUMERIC := 0;
  v_porcentaje_descuento NUMERIC;
  v_porcentaje_impuesto NUMERIC;
  v_compra_id INTEGER;
BEGIN
  -- Identificar compra afectada
  v_compra_id := COALESCE(NEW."compraIdCompra", OLD."compraIdCompra");

  -- 1. Calcular subtotal
  SELECT COALESCE(SUM(cantidad * "precioUnitario"), 0)
  INTO v_subtotal
  FROM compra_linea
  WHERE "compraIdCompra" = v_compra_id;

  -- 2. Obtener porcentaje de descuento
  SELECT "porcentajeDescuento"
  INTO v_porcentaje_descuento
  FROM compra
  WHERE "idCompra" = v_compra_id;

  IF v_porcentaje_descuento IS NOT NULL THEN
    v_descuento := v_subtotal * (v_porcentaje_descuento / 100);
  ELSE
    v_descuento := 0;
  END IF;

  -- 3. Obtener porcentaje de impuesto (solo si tiene impuesto asignado)
  SELECT i.porcentaje
  INTO v_porcentaje_impuesto
  FROM compra c
  LEFT JOIN impuesto i ON c."impuestoIdImpuesto" = i."idImpuesto"
  WHERE c."idCompra" = v_compra_id;

  IF v_porcentaje_impuesto IS NOT NULL THEN
    v_impuesto := (v_subtotal - v_descuento) * (v_porcentaje_impuesto / 100);
  ELSE
    v_impuesto := 0;
  END IF;

  -- 4. Calcular total
  v_total := v_subtotal - v_descuento + v_impuesto;

  -- 5. Actualizar la compra
  UPDATE compra
  SET subtotal = v_subtotal,
      "totalDescuento" = v_descuento,
      "totalImpuesto" = v_impuesto,
      total = v_total
  WHERE "idCompra" = v_compra_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -- 2. Trigger sobre compra_linea
-- DROP TRIGGER IF EXISTS trg_actualizar_totales_compra ON compra_linea;


--Trigger que se dispara en cualquier accion sobre la tabla compra_linea
CREATE TRIGGER trg_actualizar_totales_compra
AFTER INSERT OR UPDATE OR DELETE
ON compra_linea
FOR EACH ROW
EXECUTE FUNCTION actualizar_totales_compra();



-------------------------------------------------Compra Anulada----------------------------------------------------


-- Función: anular compra (restar inventario y poner montos en cero)
CREATE OR REPLACE FUNCTION fn_anular_compra()
RETURNS TRIGGER AS $$
DECLARE
    v_line RECORD;
BEGIN
    -- Solo actuar cuando se marca como anulada
    IF NEW.anulado = true AND OLD.anulado = false THEN
        -- Restar del inventario cada item de la compra
        FOR v_line IN
            SELECT cl."itemIdItem", cl.cantidad, c."bodegaIdBodega"
            FROM compra_linea cl
            JOIN compra c ON c."idCompra" = cl."compraIdCompra"
            WHERE cl."compraIdCompra" = NEW."idCompra"
        LOOP
            UPDATE existencia_bodega
            SET "cantDisponible" = "cantDisponible" - v_line.cantidad
            WHERE "itemIdItem" = v_line."itemIdItem"
              AND "bodegaIdBodega" = v_line."bodegaIdBodega";
        END LOOP;

        -- Poner la fecha de la anulacion
        NEW."fechaAnulacion" := NOW();
        NEW.estado := 'ANULADA';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -- Trigger sobre UPDATE de compra
-- DROP TRIGGER IF EXISTS trg_anular_compra ON compra;

CREATE TRIGGER trg_anular_compra
BEFORE UPDATE ON compra
FOR EACH ROW
EXECUTE FUNCTION fn_anular_compra();
