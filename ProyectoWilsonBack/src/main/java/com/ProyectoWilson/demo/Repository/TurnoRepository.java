package com.ProyectoWilson.demo.Repository;

import com.ProyectoWilson.demo.Entities.ClienteTratamiento;
import com.ProyectoWilson.demo.Entities.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface TurnoRepository extends JpaRepository<Turno,Long> {
    List<Turno> findByClienteAsociadoCedula(Long idCliente);
    boolean existsByFecha(LocalDateTime fecha);
    @Query("SELECT t FROM Turno t " +
            "            LEFT JOIN FETCH t.clienteAsociado" +
            "            LEFT JOIN FETCH t.tratamientoAsociado" +
            "            WHERE t.fecha > :fecha " +
            "            ORDER BY t.fecha ASC, t.horaInicio ASC")
    List<Turno> findAllByFechaAfter(@Param("fecha") LocalDate fecha);

    @Query("SELECT t FROM Turno t " +
            "LEFT JOIN FETCH t.clienteAsociado " +
            "LEFT JOIN FETCH t.tratamientoAsociado " +
            "WHERE t.fecha BETWEEN :inicio AND :fin " +
            "ORDER BY t.fecha ASC, t.horaInicio ASC")
    List<Turno> findByFechaBetween(@Param("inicio") LocalDate inicio, @Param("fin") LocalDate fin);
}
