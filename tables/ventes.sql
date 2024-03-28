CREATE TABLE IF NOT EXISTS `monstermon`.`Vente` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `idMagasin` INT(11) ,
  `idMonster` INT(11)  ,
  `Prix`  INT(11) ,
  `Date de vente`  DATE , 
  PRIMARY KEY (`id`),
  INDEX `ma_idx` (`idMagasin` ASC) VISIBLE,
  INDEX `monster_idx` (`idMonster` ASC) VISIBLE,
  CONSTRAINT `ma`
    FOREIGN KEY (`idMagasin`)
    REFERENCES `monstermon`.`Magasin` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `monster`
    FOREIGN KEY (`idMonster`)
    REFERENCES `monstermon`.`Monster` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
