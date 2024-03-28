CREATE TABLE IF NOT EXISTS `monstermon`.`Monster` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `Nom` VARCHAR(45) NULL DEFAULT NULL,
  `Point experience` INT(11),
  `Point de vie` INT(11),
  `Poids` INT(11),
  `Taille` INT(11),
  `Points de puissance` INT(11),
  `ID_Dresseur` INT(11),
  `Niveau` INT(11),
  `Espece` INT(11) ,
  `Date de capture` DATE ,
  `Capturee` VARCHAR(45),
  `Type` VARCHAR(45) ,
  PRIMARY KEY (`id`),
  INDEX `espece_id_idx` (`Espece` ASC) VISIBLE,
  INDEX `dresseur_idx` (`ID_Dresseur` ASC) VISIBLE,
  CONSTRAINT `espece_id`
    FOREIGN KEY (`Espece`)
    REFERENCES `monstermon`.`Espece` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `dresseur`
    FOREIGN KEY (`ID_Dresseur`)
    REFERENCES `monstermon`.`Dresseur` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
