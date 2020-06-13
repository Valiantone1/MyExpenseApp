package com.example.expense.model;



import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;



@Entity
@Table(name = "user")
public class User {

    @Id
    private Long id;

    @NotNull
    private String name;
    private String email;

    @OneToMany(cascade = CascadeType.PERSIST)
    private Set<Category> category;

    @OneToMany(cascade = CascadeType.PERSIST)
    private Set<Expense>  expense;


    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


}
