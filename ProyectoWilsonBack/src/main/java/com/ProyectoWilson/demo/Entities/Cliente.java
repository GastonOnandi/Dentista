package com.ProyectoWilson.demo.Entities;

import com.ProyectoWilson.demo.Entities.Historico.HistoricoCliente;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {
    @Id
    private Long cedula;
    private String nombre;
    private Long telefono;
    private String direccion;
    private String avatarUrl;
    private Long deuda;
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ClienteTratamiento> tratamientos = new ArrayList<>();

    @OneToMany(mappedBy = "clienteAsociado", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Turno> turnos = new ArrayList<>();

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HistoricoCliente> historico = new ArrayList<>();

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ClienteConsideracion> consideraciones = new ArrayList<>();
}
