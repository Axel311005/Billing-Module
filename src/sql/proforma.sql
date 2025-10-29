

-----------------------------------------Funciones para recalcular total de la proforma--------------------------------

CREATE OR REPLACE FUNCTION actualizar_total_proforma()
RETURNS TRIGGER AS $$
DECLARE
  v_subtotal NUMERIC := 0;
  v_porcentaje_impuesto NUMERIC := 0;
  v_total_impuesto NUMERIC := 0;
  v_total_estimado NUMERIC := 0;
  v_proforma_id INTEGER;
BEGIN
  v_proforma_id := COALESCE(NEW.id_proforma, OLD.id_proforma);

  SELECT COALESCE(SUM(total_linea), 0)
  INTO v_subtotal
  FROM proforma_lineas
  WHERE id_proforma = v_proforma_id;

  SELECT COALESCE(i.porcentaje, 0)
  INTO v_porcentaje_impuesto
  FROM proforma p
  LEFT JOIN impuesto i ON p.id_impuesto = i.id_impuesto
  WHERE p.id_proforma = v_proforma_id;

  v_total_impuesto := v_subtotal * (v_porcentaje_impuesto / 100.0);
  v_total_estimado := v_subtotal + v_total_impuesto;

  UPDATE proforma
  SET subtotal = v_subtotal,
      total_impuesto = v_total_impuesto,
      total_estimado = v_total_estimado
  WHERE id_proforma = v_proforma_id;

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -- Trigger para recalcular el total estimado
-- DROP TRIGGER IF EXISTS trg_actualizar_total_proforma ON proforma_lineas;

CREATE TRIGGER trg_actualizar_total_proforma
AFTER INSERT OR UPDATE OR DELETE
ON proforma_lineas
FOR EACH ROW
EXECUTE FUNCTION actualizar_total_proforma();
