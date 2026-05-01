package com.turnosapp.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "clientes")
public class Cliente {

    @Id
    private String id;
    private String nombre;
    private String apellido;
    private String tipoDocumento;
    private String documento;
    private String telefono;
    private String correo;
    private String direccion;
    private String contactoEmergencia;
    private Integer edad;
    private LocalDateTime fechaRegistro;
    private Boolean activo;
}