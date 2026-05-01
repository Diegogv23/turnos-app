package com.turnosapp.backend.controller;

import com.turnosapp.backend.model.Cliente;
import com.turnosapp.backend.service.ClienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ClienteController {

    private final ClienteService clienteService;

    @GetMapping
    public ResponseEntity<List<Cliente>> obtenerTodos() {
        return ResponseEntity.ok(clienteService.obtenerTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> obtenerPorId(@PathVariable String id) {
        return clienteService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/documento/{documento}")
    public ResponseEntity<Cliente> obtenerPorDocumento(@PathVariable String documento) {
        return clienteService.obtenerPorDocumento(documento)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Cliente>> buscar(@RequestParam String texto) {
        return ResponseEntity.ok(clienteService.buscar(texto));
    }

    @GetMapping("/activos")
    public ResponseEntity<List<Cliente>> obtenerActivos() {
        return ResponseEntity.ok(clienteService.obtenerActivos());
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Cliente cliente) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(clienteService.crear(cliente));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> actualizar(
            @PathVariable String id,
            @RequestBody Cliente cliente) {
        return clienteService.actualizar(id, cliente)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> desactivar(@PathVariable String id) {
        return clienteService.desactivar(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}