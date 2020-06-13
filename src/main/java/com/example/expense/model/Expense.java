package com.example.expense.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.Instant;

@Entity
@NoArgsConstructor
@Data
@Table(name="expense")
public class Expense {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;

	@NotNull
	private Instant expensedate;
	
	private String description;

	@NotNull
	private String location;

	@NotNull
	@ManyToOne
	private Category category;
	
	@JsonIgnore //hide data from response entity body
	@ManyToOne
	private User user;


	public String getId() {

		return this.id.toString();
	}
}
