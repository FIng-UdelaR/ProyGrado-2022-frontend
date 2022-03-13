export const Status = {
  OFFLINE: "OFFLINE",
  AVAILABLE: "AVAILABLE",
  WORKING: "WORKING",
  NEED_MANTEINANCE: "NEED_MANTEINANCE",
};

export const Material = {
  PLA_FILAMENT: "PLA_FILAMENT",
  ABS_FILAMENT: "ABS_FILAMENT",
  PETG_FILAMENT: "PETG_FILAMENT",
  POLYAMIDE_POWDER: "POLYAMIDE_POWDER",
  ALUMINA_POWDER: "ALUMINA_POWDER",
  RESIN: "RESIN",
};

export const Sizes = {
  SMALL: "SMALL",
  MEDIUM: "MEDIUM",
  LARGE: "LARGE",
  EXTRA_LARGE: "EXTRA_LARGE",
};

export const Qualities = {
  LOW: "LOW",
  HIGH: "HIGH",
};

export const PropsList = {
  MachineSupportedMaterial: "MachineSupportedMaterial",
  MachineStatus: "MachineStatus",
  MachineSupportedSizes: "MachineSupportedSizes",
  MachineSupportedQualities: "MachineSupportedQualities",
  MachineLocation: "MachineLocation",
};

export const textList = {
  MachineSupportedMaterial: "Materiales soportados",
  MachineStatus: "Estado",
  MachineSupportedSizes: "Tamaños soportados",
  MachineSupportedQualities: "Calidades soportadas",
  MachineLocation: "Ubicación",
};

export const StatusOptions = [
  { value: "OFFLINE", label: "DESCONECTADA" },
  { value: "AVAILABLE", label: "DISPONIBLE" },
  { value: "WORKING", label: "TRABAJANDO" },
  { value: "NEED_MANTEINANCE", label: "REQUIERE MANTENIMIENTO" },
];

export const MaterialOptions = [
  { value: "PLA_FILAMENT", label: "PLA FILAMENT" },
  { value: "ABS_FILAMENT", label: "ABS FILAMENT" },
  { value: "PETG_FILAMENT", label: "PETG FILAMENT" },
  { value: "POLYAMIDE_POWDER", label: "POLYAMIDE POWDER" },
  { value: "ALUMINA_POWDER", label: "ALUMINA POWDER" },
  { value: "RESIN", label: "RESIN" },
];

export const SizeOptions = [
  { value: "SMALL", label: "PEQUEÑO" },
  { value: "MEDIUM", label: "MEDIANO" },
  { value: "LARGE", label: "GRANDE" },
  { value: "EXTRA_LARGE", label: "EXTRA GRANDE" },
];

export const QualityOptions = [
  { value: "LOW", label: "BAJA" },
  { value: "HIGH", label: "ALTA" },
];

export const WorkStatus = {
  IN_PROGRESS: "IN_PROGRESS",
  PENDING: "PENDING",
  FINISHED: "FINISHED",
};

export const eventType = {
  MACHINE_STATUS_CHANGED: "MACHINE_STATUS_CHANGED",
  MACHINE_CREATED: "MACHINE_CREATED",
  NEW_WORK_STARTED: "NEW_WORK_STARTED",
  WORK_FINISHED: "WORK_FINISHED",
  NEW_WORK_ADDED: "NEW_WORK_ADDED",
  INFORMATION: "INFORMATION",
  WORK_REMOVED: "WORK_REMOVED",
};
