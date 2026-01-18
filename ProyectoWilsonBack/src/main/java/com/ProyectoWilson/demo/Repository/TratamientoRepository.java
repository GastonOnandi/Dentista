package com.ProyectoWilson.demo.Repository;

import com.ProyectoWilson.demo.Entities.Tratamiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TratamientoRepository extends JpaRepository<Tratamiento, Long> {

    @Query(value = "SELECT id, nombre, costo FROM tratamiento", nativeQuery = true)
    List<Tratamiento> findAllNative();
    boolean existsByNombre(String nombre);
}
