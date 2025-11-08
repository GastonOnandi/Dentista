package com.ProyectoWilson.demo.Repository.Historico;

import com.ProyectoWilson.demo.Entities.Historico.HistoricoCliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoricoClienteRepository extends JpaRepository<HistoricoCliente,Long> {
}
