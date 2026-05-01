package com.turnosapp.backend.repository;

import com.turnosapp.backend.model.Cliente;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface ClienteRepository extends MongoRepository<Cliente, String> {

    Optional<Cliente> findByDocumento(String documento);
    Optional<Cliente> findByCorreo(String correo);
    List<Cliente> findByActivo(Boolean activo);
    List<Cliente> findByNombreContainingIgnoreCaseOrApellidoContainingIgnoreCase(
            String nombre, String apellido);
}