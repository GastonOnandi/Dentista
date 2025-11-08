package com.ProyectoWilson.demo.Repository;

import com.ProyectoWilson.demo.Entities.Tratamiento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TratamientoRepository extends JpaRepository<Tratamiento,Long> {
}
