package com.ProyectoWilson.demo.Repository;

import com.ProyectoWilson.demo.Entities.ClienteTratamiento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ClienteTratamientoRepository extends JpaRepository<ClienteTratamiento,Long> {

    List<ClienteTratamiento> findByClienteCedula(Long idCliente);

    List<ClienteTratamiento> findByTratamientoId(Long idTratamiento);

    List<ClienteTratamiento> findByFecha(LocalDate fecha);

    List<ClienteTratamiento> findByFechaBetween(LocalDate fechaInicio, LocalDate fechaFin);

    List<ClienteTratamiento> findByClienteCedulaAndFechaBetween(Long idCliente, LocalDate fechaInicio, LocalDate fechaFin);

    List<ClienteTratamiento> findByClienteCedulaOrderByFechaDesc(Long idCliente);
}
