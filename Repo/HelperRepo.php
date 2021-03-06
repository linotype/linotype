<?php

namespace Linotype\Core\Repo;

use Linotype\Core\Entity\HelperEntity;

class HelperRepo
{

    private $dir;

    private $path;
    
    private $helpers;

    public function findById($id): ?HelperEntity
    {   
        return isset( $this->helpers[$id] ) ? $this->helpers[$id] : null;
    }

    public function findBySlug($slug): ?HelperEntity
    {   
        foreach( $this->helpers as $helper ) {
            if ( $helper->getSlug() == $slug ) {
                return $helper;
            }
        }
        return null;
    }

    public function findByAuthor($author): ?array
    {   
        $helpersByAuthor = [];
        foreach( $this->helpers as $helper ) {
            if ( $helper->getAuthor() == $author ) {
                $helpersByAuthor[ $helper->getId() ] = $helper;
            }
        }
        return $helpersByAuthor;
    }

    public function getAll(): ?array
    {
        return $this->helpers;
    }

    public function getHelper($id): ?HelperEntity
    {
        return isset( $this->helpers[$id] ) ? $this->helpers[$id] : null;
    }

    public function addHelper(HelperEntity $helper): self
    {
        $this->helpers[$helper->getId()] = $helper;

        return $this;
    }
    
}
