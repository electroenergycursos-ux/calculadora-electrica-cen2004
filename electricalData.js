/**
 * BASE DE DATOS TÉCNICA - CONFIGURADA SEGÚN MEMORIA DE LA CASETA
 */
export const electricalData = {
  // Datos extraídos de tus tablas de caída de tensión
  conductors: {
    "12 AWG": { 
      area: 3.31, 
      diam: 3.86, 
      r: 6.56,   // Valor exacto de tu PDF
      x: 0.177,  // Valor exacto de tu PDF
      amp75: 25, 
      amp90: 30, 
      kcmil: 6.53 
    },
    "10 AWG": { 
      area: 5.26, 
      diam: 4.47, 
      r: 3.94, 
      x: 0.164, 
      amp75: 35, 
      amp90: 40, 
      kcmil: 10.38 
    },
    "8 AWG": { 
      area: 8.37, 
      diam: 5.99, 
      r: 2.56, 
      x: 0.213, 
      amp75: 50, 
      amp90: 55, 
      kcmil: 16.51 
    },
    "6 AWG": { 
      area: 13.3, 
      diam: 7.72, 
      r: 1.61, 
      x: 0.167, 
      amp75: 65, 
      amp90: 75, 
      kcmil: 26.24 
    },
    "4/0 AWG": { 
      area: 107.2, 
      diam: 17.48, 
      r: 0.219, 
      x: 0.135, 
      amp75: 230, 
      amp90: 260, 
      kcmil: 211.6 
    }
  },

  // Datos de tuberías (Capacidad interna en mm2)
  conduits: {
    "PVC40": {
      "3/4\"": 327, // Usado en tus circuitos C1, C2, C3
      "1\"": 568
    },
    "EMT": {
      "3/4\"": 353, // Usado en tus circuitos de iluminación C4, C17
      "1\"": 595,
      "4\"": 8107
    }
  }
};