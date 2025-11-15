package com.ProyectoWilson.demo.Repository.Historico;

import com.ProyectoWilson.demo.Entities.Historico.HistoricoCliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistoricoClienteRepository extends JpaRepository<HistoricoCliente,Long> {
    List<HistoricoCliente> findByClienteCedulaOrderByFechaModificacionDesc(Long cedula);
}
