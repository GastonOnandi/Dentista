package com.ProyectoWilson.demo.Service.Impl;

import com.ProyectoWilson.demo.DTO.Request.TratamientoRequestDTO;
import com.ProyectoWilson.demo.DTO.Response.TratamientoResponseDTO;
import com.ProyectoWilson.demo.Entities.Tratamiento;
import com.ProyectoWilson.demo.Exceptions.Tratamiento.TratamientoNoExiste;
import com.ProyectoWilson.demo.Mapper.TratamientoMapper;
import com.ProyectoWilson.demo.Repository.TratamientoRepository;
import com.ProyectoWilson.demo.Service.Interfaces.Historico.HistoricoTratamientoService;
import com.ProyectoWilson.demo.Service.Interfaces.TratamientoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TratamientoServiceImpl implements TratamientoService {
    @Autowired
    private TratamientoMapper tratamientoMapper;

    @Autowired
    private TratamientoRepository tratamientoRepository;

    @Autowired
    private HistoricoTratamientoService historicoTratamientoService;
    @Override
    public TratamientoResponseDTO registrarTratamiento(TratamientoRequestDTO dto) {
        Tratamiento tratamiento = tratamientoMapper.toEntity(dto);
        tratamientoRepository.save(tratamiento);
        historicoTratamientoService.registrarAgregar(tratamiento);
        return tratamientoMapper.toResponseDTO(tratamiento);
    }

    @Override
    public List<TratamientoResponseDTO> listarTratamientos() {
        List<Tratamiento> tratamientos = tratamientoRepository.findAll();
        List<TratamientoResponseDTO> retornar = new ArrayList<>();
        for (Tratamiento tratamiento: tratamientos){
            TratamientoResponseDTO dto=tratamientoMapper.toResponseDTO(tratamiento);
            retornar.add(dto);
        }
        return retornar;
    }

    @Override
    public void actualizarTratamiento(Long id, TratamientoRequestDTO dto) {
        Tratamiento tratamientoViejo = tratamientoRepository.findById(id).orElseThrow(TratamientoNoExiste::new);
        Tratamiento tratamientoNuevo = tratamientoRepository.findById(id).orElseThrow(TratamientoNoExiste::new);
        tratamientoNuevo.setNombre(dto.getNombre());
        tratamientoNuevo.setCosto(dto.getCosto());
        tratamientoRepository.save(tratamientoNuevo);
        historicoTratamientoService.registrarModificacion(tratamientoViejo,tratamientoNuevo);
    }
}
