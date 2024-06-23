package org.swp391.valuationdiamond.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.swp391.valuationdiamond.service.DiamondPriceServiceImp;
import org.swp391.valuationdiamond.service.DiamondPriceServiceImp.PriceDetails;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/diamond")
public class DiamondPriceController {

    @Autowired
    private DiamondPriceServiceImp diamondPriceServiceImp;

    @GetMapping("/calculateFinalPrice")
    public PriceDetails calculateFinalPrice(@RequestParam BigDecimal caratWeight, @RequestParam String shape,
                                            @RequestParam String cut, @RequestParam String fluorescence,
                                            @RequestParam String symmetry, @RequestParam String polish,
                                            @RequestParam String color, @RequestParam String clarity,
                                            @RequestParam boolean isLabGrown) {
        return diamondPriceServiceImp.calculateFinalPrice(caratWeight, shape, cut, fluorescence, symmetry, polish, color, clarity, isLabGrown);
    }
}
