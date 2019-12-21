package com.roberto.gerenciadorfinanceiro.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "tb_cidade")
public class CidadeModel {

    @Id
    private Long codigo;

    private String nome;

    @ManyToOne
    @JoinColumn(name="codigo_estado")
    private EstadoModel estado;

    public Long getCodigo() {
        return codigo;
    }

    public void setCodigo(Long codigo) {
        this.codigo = codigo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public EstadoModel getEstado() {
        return estado;
    }

    public void setEstado(EstadoModel estado) {
        this.estado = estado;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CidadeModel)) return false;
        CidadeModel cidade = (CidadeModel) o;
        return Objects.equals(getCodigo(), cidade.getCodigo());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getCodigo());
    }


}
