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
exports.ProcessoAdministrativo = exports.StatusProcesso = void 0;
// packages/core-domain/src/processo.entity.ts
const typeorm_1 = require("typeorm");
const debito_entity_1 = require("./debito.entity");
var StatusProcesso;
(function (StatusProcesso) {
    StatusProcesso["PENDENTE_ANALISE"] = "PENDENTE_ANALISE";
    StatusProcesso["PRESCRITO"] = "PRESCRITO";
    StatusProcesso["EM_COBRANCA"] = "EM_COBRANCA";
    StatusProcesso["PAGO"] = "PAGO";
    StatusProcesso["CANCELADO"] = "CANCELADO";
})(StatusProcesso || (exports.StatusProcesso = StatusProcesso = {}));
let ProcessoAdministrativo = class ProcessoAdministrativo {
};
exports.ProcessoAdministrativo = ProcessoAdministrativo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProcessoAdministrativo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: StatusProcesso,
        default: StatusProcesso.PENDENTE_ANALISE,
    }),
    __metadata("design:type", String)
], ProcessoAdministrativo.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ProcessoAdministrativo.prototype, "dataCriacao", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], ProcessoAdministrativo.prototype, "observacoes", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => debito_entity_1.Debito, (debito) => debito.processoAdministrativo),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", debito_entity_1.Debito)
], ProcessoAdministrativo.prototype, "debito", void 0);
exports.ProcessoAdministrativo = ProcessoAdministrativo = __decorate([
    (0, typeorm_1.Entity)('processos_administrativos')
], ProcessoAdministrativo);
