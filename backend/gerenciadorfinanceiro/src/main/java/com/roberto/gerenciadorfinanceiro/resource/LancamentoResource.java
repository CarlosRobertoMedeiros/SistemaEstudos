package com.roberto.gerenciadorfinanceiro.resource;


import com.roberto.gerenciadorfinanceiro.event.RecursoCriadoEvent;
import com.roberto.gerenciadorfinanceiro.model.LancamentoModel;
import com.roberto.gerenciadorfinanceiro.repository.LancamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/lancamentos")
public class LancamentoResource {

    @Autowired
    private LancamentoRepository lancamentoRepository;

    @Autowired
    private ApplicationEventPublisher publisher;

    @GetMapping
    public ResponseEntity<?> listarTodos() {
        List<LancamentoModel> lancamentos = lancamentoRepository.findAll();

        if (!lancamentos.isEmpty())
            return ResponseEntity.ok(lancamentos);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("{codigo}")
    public ResponseEntity<?> listarPorCodigo(@PathVariable Long codigo) {
        Optional<LancamentoModel> lancamento = lancamentoRepository.findById(codigo);

        if (lancamento.isPresent())
            return ResponseEntity.ok(lancamento);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/descricao/{descricao}")
    public ResponseEntity<?> listarPorDescricao(@PathVariable String descricao){
        List<LancamentoModel> lancamentos = lancamentoRepository.findByDescricaoIgnoreCaseContaining(descricao);

        if (!lancamentos.isEmpty())
            return ResponseEntity.ok(lancamentos);

        return  ResponseEntity.noContent().build();

    }

    @DeleteMapping("{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long codigo){
        lancamentoRepository.deleteById(codigo);
    }

    @PostMapping
    public ResponseEntity<LancamentoModel> criar(@RequestBody LancamentoModel lancamento, HttpServletResponse resp){
        LancamentoModel lancamentoSalvo = lancamentoRepository.save(lancamento);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{codigo}")
                  .buildAndExpand(lancamentoSalvo.getCodigo()).toUri();
        resp.setHeader("Location",uri.toASCIIString());

        publisher.publishEvent(new RecursoCriadoEvent(this, resp, lancamentoSalvo.getCodigo()));
        return ResponseEntity.status(HttpStatus.CREATED).body(lancamentoSalvo);
    }


}
