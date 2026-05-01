package com.turnosapp.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "turnos")
public class Turno {

    @Id
    private String id;
    private LocalDateTime fechaHora;
    private String clienteId;
    private String profesionalId;
    private String tratamientoId;
    private String sede;
    private String estado;
    private String notas;
    private LocalDateTime fechaCreacion;
}