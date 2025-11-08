package com.ProyectoWilson.demo.Service.Interfaces;

import com.ProyectoWilson.demo.Entities.ClienteTratamiento;

import java.time.LocalDate;
import java.util.List;

public interface TratamientoService {
    ClienteTratamiento asociarTratamiento(Long idCliente,Long idTratamiento);
    List<ClienteTratamiento> obtenerPorCliente(Long idCliente);
    List<ClienteTratamiento> obtenerPorTratamiento(Long idTratamiento);
    List<ClienteTratamiento> obtenerPorFecha(LocalDate fecha);
    Void eliminar (Long id);
}
