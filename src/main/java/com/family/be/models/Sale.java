package com.family.be.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jdk.jfr.Enabled;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nameSale;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date dateStart;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date dateEnd;
    private Long amongSale;

    @OneToMany(mappedBy = "sale",cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    private Set<Product> products = new HashSet<>();
}
