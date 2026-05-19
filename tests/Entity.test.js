import { describe, it, expect } from 'vitest';
import { Entity } from '../src/entities/Entity.js';

describe('Entity', () => {
    it('should initialize with correct properties', () => {
        const entity = new Entity(10, 20, 30, 40, 5);
        expect(entity.x).toBe(10);
        expect(entity.y).toBe(20);
        expect(entity.width).toBe(30);
        expect(entity.height).toBe(40);
        expect(entity.speed).toBe(5);
        expect(entity.active).toBe(true);
    });

    it('should return correct bounding box', () => {
        const entity = new Entity(10, 20, 30, 40, 5);
        const bounds = entity.getBounds();
        expect(bounds).toEqual({
            x: 10,
            y: 20,
            width: 30,
            height: 40
        });
    });
});
