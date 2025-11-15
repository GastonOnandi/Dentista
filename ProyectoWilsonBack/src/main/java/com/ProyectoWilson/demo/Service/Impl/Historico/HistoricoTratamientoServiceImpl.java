package com.ProyectoWilson.demo.Service.Impl.Historico;

import com.ProyectoWilson.demo.DTO.Response.Historico.HistoricoTratamientoResponseDTO;
import com.ProyectoWilson.demo.Entities.Historico.HistoricoTratamiento;
import com.ProyectoWilson.demo.Entities.Tratamiento;
import com.ProyectoWilson.demo.Mapper.Historico.HistoricoTratamientoMapper;
import com.ProyectoWilson.demo.Repository.Historico.HistoricoTratamientoRepository;
import com.ProyectoWilson.demo.Service.Interfaces.Historico.HistoricoTratamientoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class HistoricoTratamientoServiceImpl implements HistoricoTratamientoService {
    @Autowired
    private HistoricoTratamientoRepository historicoTratamientoRepository;

    @Autowired
    private HistoricoTratamientoMapper historicoTratamientoMapper;
    @Override
    public void registrarAgregar(Tratamiento nuevo) {
        HistoricoTratamiento historicoTratamiento = new HistoricoTratamiento();
        historicoTratamiento.setTratamiento(nuevo);
        historicoTratamiento.setFechaModificacion(LocalDate.now());
        historicoTratamiento.setTipoModificacion("Registrar");
        historicoTratamiento.setCostoNuevo(nuevo.getCosto());
        historicoTratamiento.setNombreNuevo(nuevo.getNombre());
    }

    @Override
    public void registrarModificacion(Tratamiento anterior, Tratamiento nuevo) {
        HistoricoTratamiento historicoTratamiento = new HistoricoTratamiento();
        historicoTratamiento.setTratamiento(nuevo);
        historicoTratamiento.setFechaModificacion(LocalDate.now());
        historicoTratamiento.setTipoModificacion("Modificar");
        historicoTratamiento.setCostoNuevo(nuevo.getCosto());
        historicoTratamiento.setNombreNuevo(nuevo.getNombre());
        historicoTratamiento.setNombreViejo(anterior.getNombre());
        historicoTratamiento.setCostoViejo(anterior.getCosto());
    }

    @Override
    public List<HistoricoTratamientoResponseDTO> listarPorTratamiento(Tratamiento tratamiento) {
        List<HistoricoTratamiento>historicoTratamientos = historicoTratamientoRepository.findByTratamientoOrderByFechaModificacionDesc(tratamiento);
        List<HistoricoTratamientoResponseDTO>historicoTratamientoResponseDTOS = new ArrayList<>();
        for (HistoricoTratamiento historicoTratamiento: historicoTratamientos){
            historicoTratamientoResponseDTOS.add(historicoTratamientoMapper.toResponseDTO(historicoTratamiento));
        }
        return historicoTratamientoResponseDTOS;
    }
}
