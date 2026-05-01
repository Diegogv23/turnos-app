package com.turnosapp.backend.service;

import com.turnosapp.backend.model.Cliente;
import com.turnosapp.backend.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public List<Cliente> obtenerTodos() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> obtenerPorId(String id) {
        return clienteRepository.findById(id);
    }

    public Optional<Cliente> obtenerPorDocumento(String documento) {
        return clienteRepository.findByDocumento(documento);
    }

    public List<Cliente> buscar(String texto) {
        return clienteRepository
                .findByNombreContainingIgnoreCaseOrApellidoContainingIgnoreCase(
                        texto, texto);
    }

    public List<Cliente> obtenerActivos() {
        return clienteRepository.findByActivo(true);
    }

    public Cliente crear(Cliente cliente) {
        if (clienteRepository.findByDocumento(cliente.getDocumento()).isPresent()) {
            throw new RuntimeException("Ya existe un cliente con ese documento");
        }
        cliente.setActivo(true);
        cliente.setFechaRegistro(LocalDateTime.now());
        return clienteRepository.save(cliente);
    }

    public Optional<Cliente> actualizar(String id, Cliente clienteActualizado) {
        return clienteRepository.findById(id).map(cliente -> {
            cliente.setNombre(clienteActualizado.getNombre());
            cliente.setApellido(clienteActualizado.getApellido());
            cliente.setTipoDocumento(clienteActualizado.getTipoDocumento());
            cliente.setDocumento(clienteActualizado.getDocumento());
            cliente.setTelefono(clienteActualizado.getTelefono());
            cliente.setCorreo(clienteActualizado.getCorreo());
            cliente.setDireccion(clienteActualizado.getDireccion());
            cliente.setContactoEmergencia(clienteActualizado.getContactoEmergencia());
            cliente.setEdad(clienteActualizado.getEdad());
            return clienteRepository.save(cliente);
        });
    }

    public boolean desactivar(String id) {
        return clienteRepository.findById(id).map(cliente -> {
            cliente.setActivo(false);
            clienteRepository.save(cliente);
            return true;
        }).orElse(false);
    }
}