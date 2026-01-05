package com.ProyectoWilson.demo.Mapper;

import com.ProyectoWilson.demo.DTO.Request.TurnoRequestDTO;
import com.ProyectoWilson.demo.DTO.Response.TurnoItemDTO;
import com.ProyectoWilson.demo.DTO.Response.TurnoResponseDTO;
import com.ProyectoWilson.demo.DTO.Response.TurnosPorDia;
import com.ProyectoWilson.demo.Entities.Turno;
import com.ProyectoWilson.demo.Exceptions.Cliente.ClienteNoExiste;
import com.ProyectoWilson.demo.Repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Component
public class TurnoMapper {
    @Autowired
    private ClienteRepository clienteRepository;
    public Turno toEntity(TurnoRequestDTO dto){
        Turno turno = new Turno();
        turno.setFecha(dto.getFecha());
        turno.setHoraInicio(dto.getHoraInicio());
        turno.setHoraFin(dto.getHoraFin());

        turno.setClienteAsociado(
                clienteRepository.findById(dto.getIdCliente())
                        .orElseThrow(ClienteNoExiste::new)
        );

        return turno;
    }

    public TurnoResponseDTO toResponseDTO(Turno turno) {
        return new TurnoResponseDTO(
                turno.getId(),
                turno.getClienteAsociado() != null ? turno.getClienteAsociado().getNombre() : null,
                turno.getTratamientoAsociado() != null ? turno.getTratamientoAsociado().getNombre() : null,
                turno.getFecha(),
                turno.getHoraInicio(),
                turno.getHoraFin()
        );
    }

    public TurnoItemDTO toItemDTO(Turno turno) {

        String nombre = turno.getClienteAsociado() != null
                ? turno.getClienteAsociado().getNombre()
                : "Sin cliente";

        String iniciales = generarIniciales(nombre);

        String hora = turno.getHoraInicio() != null
                ? turno.getHoraInicio().toString()
                : "--:--";

        String tratamiento = turno.getTratamientoAsociado() != null
                ? turno.getTratamientoAsociado().getNombre()
                : "Sin tratamiento";

        return new TurnoItemDTO(
                iniciales,
                nombre,
                hora,
                tratamiento
        );
    }



    public List<TurnosPorDia> agruparPorDia(List<Turno> turnos) {
        Map<LocalDate, List<TurnoItemDTO>> agrupado = new LinkedHashMap<>();

        for (Turno turno : turnos) {
            LocalDate fecha = turno.getFecha(); // <- AGRUPA POR FECHA REAL

            if (!agrupado.containsKey(fecha)) {
                agrupado.put(fecha, new ArrayList<>());
            }

            agrupado.get(fecha).add(toItemDTO(turno));
        }

        List<TurnosPorDia> resultado = new ArrayList<>();

        for (Map.Entry<LocalDate, List<TurnoItemDTO>> entry : agrupado.entrySet()) {
            String diaFormateado = formatearFechaParaUI(entry.getKey());
            resultado.add(new TurnosPorDia(diaFormateado, entry.getValue()));
        }

        return resultado;
    }

    private String formatearFechaParaUI(LocalDate fecha) {
        // ejemplo: "Wednesday, Oct 29"
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEEE, MMM dd");
        return fecha.format(formatter);
    }

    private String generarIniciales(String nombreCompleto) {
        String[] partes = nombreCompleto.trim().split("\\s+");
        StringBuilder sb = new StringBuilder();

        for (String parte : partes) {
            sb.append(parte.substring(0, 1).toUpperCase());
        }

        return sb.toString();
    }

}
