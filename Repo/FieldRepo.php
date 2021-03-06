<?php

namespace Linotype\Core\Repo;

use Linotype\Core\Entity\FieldEntity;

class FieldRepo
{

    private $dir;

    private $path;
    
    private $fields;

    public function findById($id): ?FieldEntity
    {   
        return isset( $this->fields[$id] ) ? $this->fields[$id] : null;
    }

    public function findBySlug($slug): ?FieldEntity
    {   
        foreach( $this->fields as $field ) {
            if ( $field->getSlug() == $slug ) {
                return $field;
            }
        }
        return null;
    }

    public function findByAuthor($author): ?array
    {   
        $fieldsByAuthor = [];
        foreach( $this->fields as $field ) {
            if ( $field->getAuthor() == $author ) {
                $fieldsByAuthor[ $field->getId() ] = $field;
            }
        }
        return $fieldsByAuthor;
    }

    public function getAll(): ?array
    {
        return $this->fields;
    }

    public function getField($id): ?FieldEntity
    {
        return isset( $this->fields[$id] ) ? $this->fields[$id] : null;
    }

    public function addField(FieldEntity $field): self
    {
        $this->fields[$field->getId()] = $field;

        return $this;
    }
    
}
