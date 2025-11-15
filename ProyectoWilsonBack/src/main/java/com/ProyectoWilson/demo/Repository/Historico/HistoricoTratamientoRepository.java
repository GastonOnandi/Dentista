package com.ProyectoWilson.demo.Repository.Historico;

import com.ProyectoWilson.demo.Entities.Historico.HistoricoTratamiento;
import com.ProyectoWilson.demo.Entities.Tratamiento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistoricoTratamientoRepository extends JpaRepository<HistoricoTratamiento,Long> {
    List<HistoricoTratamiento> findByTratamientoOrderByFechaModificacionDesc(Tratamiento tratamiento);

}
