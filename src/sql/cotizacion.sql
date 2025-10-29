

----------------------------------------Funciones para recalcular total de la cotización------------------------------

CREATE OR REPLACE FUNCTION actualizar_total_cotizacion()
RETURNS TRIGGER AS $$
DECLARE
  v_total NUMERIC := 0;
  v_cotizacion_id INTEGER;
BEGIN
  v_cotizacion_id := COALESCE(NEW.id_cotizacion, OLD.id_cotizacion);

  SELECT COALESCE(SUM(total_lineas), 0)
  INTO v_total
  FROM detalle_cotizacion
  WHERE id_cotizacion = v_cotizacion_id;

  UPDATE cotizacion
  SET total = v_total
  WHERE id_cotizacion = v_cotizacion_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -- Trigger para recalcular el total
-- DROP TRIGGER IF EXISTS trg_actualizar_total_cotizacion ON detalle_cotizacion;

CREATE TRIGGER trg_actualizar_total_cotizacion
AFTER INSERT OR UPDATE OR DELETE
ON detalle_cotizacion
FOR EACH ROW
EXECUTE FUNCTION actualizar_total_cotizacion();
