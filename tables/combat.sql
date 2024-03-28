CREATE TABLE IF NOT EXISTS `monstermon`.`Combat` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `Id_Monster1` INT(11) ,
  `id_Monster2` INT(11) ,
  `id_gagnant` INT(11) ,
  PRIMARY KEY (`id`),
  INDEX `monst1_idx` (`Id_Monster1` ASC) VISIBLE,
  INDEX `monst2_idx` (`id_Monster2` ASC) VISIBLE,
  INDEX `gagnant_idx` (`id_gagnant` ASC) VISIBLE,
  CONSTRAINT `monst1`
    FOREIGN KEY (`Id_Monster1`)
    REFERENCES `monstermon`.`Monster` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `monst2`
    FOREIGN KEY (`id_Monster2`)
    REFERENCES `monstermon`.`Monster` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `gagnant`
    FOREIGN KEY (`id_gagnant`)
    REFERENCES `monstermon`.`Monster` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)