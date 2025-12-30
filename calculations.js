import { electricalData } from './electricalData.js';

/**
 * MOTOR DE CÁLCULO ELÉCTRICO - NORMATIVA CEN-2004 / NEC
 */
export const calculateCircuit = (inputs) => {
  const { cargaVA, voltajeV, sistema, distanciaKm, fp, calibre, tipoTubo } = inputs;
  const cond = electricalData.conductors[calibre];

  // --- 1. CÁLCULO DE CORRIENTE Y AMPACIDAD (NEC 310.15) ---
  // Factor de sistema: 1 para monofásico, 1.732 para trifásico
  const factorSistema = sistema === 'monofasico' ? 1 : 1.732;
  const iNominal = cargaVA / (voltajeV * factorSistema);
  
  // Corriente Requerida (125% para cargas continuas)
  const iReq = iNominal * 1.25; 

  // --- 2. CÁLCULO DE CAÍDA DE TENSIÓN (%) ---
  // Tu fórmula: ΔV% = (kVA * L * (R*cosθ + X*senθ)) / (K * kV²)
  const K = sistema === 'monofasico' ? 5.0 : 10.0; // Coherencia K=5 (1F) o K=10 (3F)
  const kV = voltajeV / 1000;
  const kVA = cargaVA / 1000;
  
  // Cálculo de seno a partir del factor de potencia (coseno)
  const senTheta = Math.sqrt(1 - Math.pow(fp, 2));
  
  // Impedancia eficaz (Ze)
  const impedanciaEficaz = (cond.r * fp) + (cond.x * senTheta);
  
  const vDropPercent = (kVA * distanciaKm * impedanciaEficaz) / (K * Math.pow(kV, 2));

  // --- 3. CÁLCULO DE CANALIZACIÓN (OCUPACIÓN) ---
  // f TOTAL (mm2) basado en el diámetro de tus conductores
  const areaUnitaria = (Math.PI * Math.pow(cond.diam, 2)) / 4;
  
  // En tus PDF usas 3 conductores para circuitos derivados (Fase, Neutro, Tierra)
  const areaTotalConductores = areaUnitaria * 3; 
  
  // Obtenemos la capacidad del tubo (PVC o EMT) de la base de datos
  const capacidadTubo = electricalData.conduits[tipoTubo]["3/4\""];
  const ocupacion = (areaTotalConductores / capacidadTubo) * 100;

  return {
    iNominal: iNominal.toFixed(2),
    iReq: iReq.toFixed(2),
    vDrop: vDropPercent.toFixed(2),
    ocupacion: ocupacion.toFixed(2),
    tuboSugerido: "3/4\"",
    alertaCaida: vDropPercent > 3 // Alerta si supera el 3% según norma
  };
};