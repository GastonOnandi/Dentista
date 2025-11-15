package com.ProyectoWilson.demo.Repository;

import com.ProyectoWilson.demo.Entities.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente,Long> {
    boolean existsByCedula(Long cedula);
}
