package com.ProyectoWilson.demo.Repository;

import com.ProyectoWilson.demo.Entities.ClienteTratamiento;
import com.ProyectoWilson.demo.Entities.Turno;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface TurnoRepository extends JpaRepository<Turno,Long> {
    List<Turno> findByClienteAsociadoCedula(Long idCliente);
    List<Turno> findByFechaBetween(LocalDate fechaInicio, LocalDate fechaFin);
    boolean existsByFecha(LocalDateTime fecha);
    List<Turno> findAllByFechaAfter(LocalDate fecha);
}
