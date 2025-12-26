package com.ProyectoWilson.demo.Repository;

import com.ProyectoWilson.demo.DTO.Response.DeudaTratamientoDTO;
import com.ProyectoWilson.demo.Entities.ClienteTratamiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ClienteTratamientoRepository extends JpaRepository<ClienteTratamiento,Long> {

    List<ClienteTratamiento> findByClienteCedula(Long idCliente);

    List<ClienteTratamiento> findByTratamientoId(Long idTratamiento);

    List<ClienteTratamiento> findByFecha(LocalDate fecha);

    List<ClienteTratamiento> findByFechaBetween(LocalDate fechaInicio, LocalDate fechaFin);

    List<ClienteTratamiento> findByClienteCedulaAndFechaBetween(Long idCliente, LocalDate fechaInicio, LocalDate fechaFin);

    List<ClienteTratamiento> findByClienteCedulaOrderByFechaDesc(Long idCliente);

    Optional<ClienteTratamiento> findByClienteCedulaAndTratamientoId(Long clienteCedula, Long tratamientoId);

    // Método para obtener todas las deudas con información del cliente y tratamiento
    @Query("SELECT ct FROM ClienteTratamiento ct " +
            "JOIN FETCH ct.cliente c " +
            "JOIN FETCH ct.tratamiento t " +
            "ORDER BY ct.fecha DESC")
    List<ClienteTratamiento> findAllWithClienteAndTratamiento();

    // Opcional: Filtrar solo las que tienen deuda pendiente
    @Query("SELECT ct FROM ClienteTratamiento ct " +
            "JOIN FETCH ct.cliente c " +
            "JOIN FETCH ct.tratamiento t " +
            "WHERE ct.debe > 0 " +
            "ORDER BY ct.fecha DESC")
    List<ClienteTratamiento> findAllPendingDebts();

    // Opcional: Filtrar por estado
    @Query("SELECT ct FROM ClienteTratamiento ct " +
            "JOIN FETCH ct.cliente c " +
            "JOIN FETCH ct.tratamiento t " +
            "WHERE ct.estado = :estado " +
            "ORDER BY ct.fecha DESC")
    List<ClienteTratamiento> findByEstado(String estado);
}
