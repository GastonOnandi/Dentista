package com.ProyectoWilson.demo.Repository.Historico;

import com.ProyectoWilson.demo.Entities.Historico.HistoricoClienteConsideracion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistoricoClienteConsideracionRepository extends JpaRepository<HistoricoClienteConsideracion,Long> {
    List<HistoricoClienteConsideracion> findByClienteConsideracionIdOrderByFechaModificacionDesc(Long clienteConsideracionId);
}
