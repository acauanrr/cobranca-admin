"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inscrito = void 0;
// packages/core-domain/src/entities/Inscrito.ts
const typeorm_1 = require("typeorm"); // <- remova se não usar TypeORM
let Inscrito = class Inscrito {
    /* ---------- Domínio ---------- */
    constructor(props) {
        // atribuição explícita evita o strictPropertyInitialization
        this.id = props.id;
        this.cpf = props.cpf;
        this.nome = props.nome;
        this.email = props.email;
        this.ativo = props.ativo ?? true; // default = true
    }
    ativar() { this.ativo = true; }
    inativar() { this.ativo = false; }
    toJSON() {
        const { id, cpf, nome, email, ativo } = this;
        return { id, cpf, nome, email, ativo };
    }
};
exports.Inscrito = Inscrito;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid') // <- remova se não usar TypeORM
    ,
    __metadata("design:type", String)
], Inscrito.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 14, unique: true }) // <- remova se não usar TypeORM
    ,
    __metadata("design:type", String)
], Inscrito.prototype, "cpf", void 0);
__decorate([
    (0, typeorm_1.Column)() // <- remova se não usar TypeORM
    ,
    __metadata("design:type", String)
], Inscrito.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }) // <- remova se não usar TypeORM
    ,
    __metadata("design:type", String)
], Inscrito.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }) // <- remova se não usar TypeORM
    ,
    __metadata("design:type", Boolean)
], Inscrito.prototype, "ativo", void 0);
exports.Inscrito = Inscrito = __decorate([
    (0, typeorm_1.Entity)() // <- remova se não usar TypeORM
    ,
    __metadata("design:paramtypes", [Object])
], Inscrito);
