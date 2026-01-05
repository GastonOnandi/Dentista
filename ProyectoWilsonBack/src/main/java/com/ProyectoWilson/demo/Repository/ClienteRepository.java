package com.ProyectoWilson.demo.Repository;

import com.ProyectoWilson.demo.Entities.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClienteRepository extends JpaRepository<Cliente,Long> {
    boolean existsByCedula(Long cedula);
    List<Cliente> findByNombreContainingIgnoreCase(String nombre);
    List<Cliente> findByNombreContaining(String nombre);
}
