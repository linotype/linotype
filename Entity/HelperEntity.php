<?php

namespace Linotype\Core\Entity;

use Linotype\Core\Entity\Traits\DefaultTrait;
use Linotype\Core\Entity\Traits\KeyTrait;
use Linotype\Core\Entity\Traits\TemplateRefTrait;

class HelperEntity
{

    use DefaultTrait;
    use KeyTrait;
    use TemplateRefTrait;

    private $id;

    private $key;

    private $version;

    private $author;
    
    private $name;
    
    private $desc;
    
    private $info;

    private $methode;

    public function getMethode(): ?array
    {
        return $this->methode;
    }

    public function setMethode(array $methode): self
    {
        $this->methode = $methode;

        return $this;
    }

}
