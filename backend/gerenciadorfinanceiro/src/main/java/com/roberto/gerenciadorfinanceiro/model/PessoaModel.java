package com.roberto.gerenciadorfinanceiro.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "tb_pessoa")
public class PessoaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    @NotNull
    private String nome;

    @NotNull
    private Boolean ativo;

    @JsonIgnoreProperties("pessoa")//Vai dar StackOverflow loop infinito entre pessoa e contato aqui eu desabilito
    @Valid
    @OneToMany(mappedBy = "pessoa", cascade = CascadeType.ALL)
    private List<ContatoModel> contatos;

    @Embedded
    private EnderecoModel endereco;

    public Long getCodigo() {
        return codigo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    public EnderecoModel getEndereco() {
        return endereco;
    }

    public void setEndereco(EnderecoModel endereco) {
        this.endereco = endereco;
    }

    public void setCodigo(Long codigo) {
        this.codigo = codigo;
    }

    public List<ContatoModel> getContatos() {
        return contatos;
    }

    public void setContatos(List<ContatoModel> contatos) {
        this.contatos = contatos;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PessoaModel)) return false;
        PessoaModel that = (PessoaModel) o;
        return codigo.equals(that.codigo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(codigo);
    }
}
