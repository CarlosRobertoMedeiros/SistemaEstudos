package com.roberto.gerenciadorfinanceiro.resource;

import com.roberto.gerenciadorfinanceiro.event.RecursoCriadoEvent;
import com.roberto.gerenciadorfinanceiro.filter.PessoaFilter;
import com.roberto.gerenciadorfinanceiro.model.PessoaModel;
import com.roberto.gerenciadorfinanceiro.repository.PessoaRepository;
import com.roberto.gerenciadorfinanceiro.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/pessoas")
public class PessoaResource {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private PessoaService pessoaService;

    @Autowired
    private ApplicationEventPublisher publisher;

    //TODO: Reimplementar o ListarTodos retornando uma paginação, evitando as consultas baseadas em eager
//    Antes a API era assim
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_PESQUISAR_PESSOA') and #oauth2.hasScope('read')")
    public ResponseEntity<Object> ListarTodas(){
        List<PessoaModel> pessoas = pessoaRepository.findAll();
        if (pessoas.isEmpty()){
            return  ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(pessoas);
    }

    /*@GetMapping
    public Page<PessoaModel>ListarTodas(PessoaFilter pessoaFilter, Pageable pageable){
        return pessoaRepository.filtrar(pessoaFilter,pageable);
    }*/

    @GetMapping("{codigo}")
    @PreAuthorize("hasAuthority('ROLE_PESQUISAR_PESSOA') and #oauth2.hasScope('read')")
    public ResponseEntity<?> listarPorCodigo(@PathVariable Long codigo){
        Optional<PessoaModel> pessoa = pessoaRepository.findById(codigo);

        if (pessoa.isPresent())
            return ResponseEntity.ok(pessoa);

        return ResponseEntity.noContent().build();
    }

    @GetMapping(params = "listar")
    @PreAuthorize("hasAuthority('ROLE_PESQUISAR_PESSOA') and #oauth2.hasScope('read')")
    public Page<PessoaModel> ListarComFiltro(PessoaFilter pessoaFilter, Pageable pageable){
        return pessoaRepository.filtrar(pessoaFilter,pageable);
    }

    @DeleteMapping("{codigo}")
    @PreAuthorize("hasAuthority('ROLE_REMOVER_PESSOA') and #oauth2.hasScope('write')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long codigo){
        pessoaRepository.deleteById(codigo);
    }

    @PutMapping("/{codigo}/ativo")
    @PreAuthorize("hasAuthority('ROLE_CADASTRAR_PESSOA') and #oauth2.hasScope('write')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void atualizar(@PathVariable Long codigo, @RequestBody boolean ativo){
        pessoaService.atuallizarPropriedadeAtiva(codigo,ativo);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_CADASTRAR_PESSOA') and #oauth2.hasScope('write')")
    public ResponseEntity<PessoaModel> criar(@RequestBody PessoaModel pessoa, HttpServletResponse resp){
        PessoaModel pessoaSalva = pessoaRepository.save(pessoa);

        publisher.publishEvent(new RecursoCriadoEvent(this, resp, pessoaSalva.getCodigo()));
        return ResponseEntity.status(HttpStatus.CREATED).body(pessoaSalva);
    }

    @PutMapping("/{codigo}")
    @PreAuthorize("hasAuthority('ROLE_CADASTRAR_PESSOA') and #oauth2.hasScope('write')")
    public ResponseEntity<PessoaModel> atualizar(@RequestBody PessoaModel pessoa,
                                                     @PathVariable long codigo) {

        PessoaModel pessoaModel = pessoaService.atualizar(codigo, pessoa);

        if (pessoaModel == null)
            return ResponseEntity.noContent().build();

        return ResponseEntity.ok().body(pessoaModel);
    }


}
