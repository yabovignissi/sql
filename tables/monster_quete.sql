CREATE TABLE IF NOT EXISTS `monstermon`.`Monster_quete` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `Monster_ID` INT(11) ,
  `quete_id` INT(11) ,
  PRIMARY KEY (`id`),
  INDEX `monsterqu_idx` (`Monster_ID` ASC) VISIBLE,
  INDEX `quete_idx` (`quete_id` ASC) VISIBLE,
  CONSTRAINT `monsterqu`
    FOREIGN KEY (`Monster_ID`)
    REFERENCES `monstermon`.`Monster` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `quete`
    FOREIGN KEY (`quete_id`)
    REFERENCES `monstermon`.`Quete` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)