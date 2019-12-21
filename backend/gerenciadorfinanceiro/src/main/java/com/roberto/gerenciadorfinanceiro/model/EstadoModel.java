package com.roberto.gerenciadorfinanceiro.model;

        import javax.persistence.Entity;
        import javax.persistence.Id;
        import javax.persistence.Table;
        import java.util.Objects;

@Entity
@Table(name = "tb_estado")
public class EstadoModel {

    @Id
    private Long codigo;

    private String nome;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof EstadoModel)) return false;
        EstadoModel estado = (EstadoModel) o;
        return Objects.equals(getCodigo(), estado.getCodigo());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getCodigo());
    }
}
