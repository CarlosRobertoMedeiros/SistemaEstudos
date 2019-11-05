package com.roberto.gerenciadorfinanceiro.resource;

import com.roberto.gerenciadorfinanceiro.filter.PessoaFilter;
import com.roberto.gerenciadorfinanceiro.model.PessoaModel;
import com.roberto.gerenciadorfinanceiro.repository.PessoaRepository;
import com.roberto.gerenciadorfinanceiro.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/pessoas")
public class PessoaResource {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private PessoaService pessoaService;

    //TODO: Reimplementar o ListarTodos retornando uma paginação, evitando as consultas baseadas em eager
//    Antes a API era assim
//    @GetMapping
//    public ResponseEntity<List<PessoaModel>> ListarTodas(){
//        List<PessoaModel> pessoas = pessoaRepository.findAll();
//        if (pessoas.isEmpty()){
//            return  ResponseEntity.noContent().build();
//        }
//        return ResponseEntity.ok().body(pessoas);
//    }

    @GetMapping
    public Page<PessoaModel>ListarTodas(PessoaFilter pessoaFilter, Pageable pageable){
        return pessoaRepository.filtrar(pessoaFilter,pageable);
    }


    @GetMapping(params = "listar")
    public Page<PessoaModel> ListarComFiltro(PessoaFilter pessoaFilter, Pageable pageable){
        return pessoaRepository.filtrar(pessoaFilter,pageable);
    }

    @DeleteMapping("{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long codigo){
        pessoaRepository.deleteById(codigo);
    }

    @PutMapping("/{codigo}/ativo")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void atualizar(@PathVariable Long codigo, @RequestBody boolean ativo){
        pessoaService.atuallizarPropriedadeAtiva(codigo,ativo);
    }


}
