

-----------------------------------------Funciones para recalcular total de la proforma--------------------------------

CREATE OR REPLACE FUNCTION actualizar_total_proforma()
RETURNS TRIGGER AS $$
DECLARE
  v_total NUMERIC := 0;
  v_proforma_id INTEGER;
BEGIN
  v_proforma_id := COALESCE(NEW.id_proforma, OLD.id_proforma);

  SELECT COALESCE(SUM(total_linea), 0)
  INTO v_total
  FROM proforma_lineas
  WHERE id_proforma = v_proforma_id;

  UPDATE proforma
  SET total_estimado = v_total
  WHERE id_proforma = v_proforma_id;

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
