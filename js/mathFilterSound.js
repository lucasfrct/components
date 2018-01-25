/*
    SIMBOLOS

Xc = reatância capacitiva (reação ao curto) 
Xl = reatância indutiva (reaçao ao curto)
R = resitância
C = capacitância
L = indutância
f = frequência
Req = resistência equivalente (resitencia de todo o circuito)
fR = frequencia resonante
w = omega => 2*pi() (rad/s => radianos por segundo ou volta por segundo => 1 volta = 1 ciclo)
w0 = frequencia => (2 * Math.PI * f)
Vin(w) = função da voltagem de entrada
Vout(w) = função da voltagem de saida
Iin(w) = função da corrente de entrada
Iout(w) = função da corrente de saida
H(w) = função de transferência
GV = ganho de tensão
a(w) = alfa omega = angulo da fase
fc = frequencia central
fcut = frequencia de corte
fcutSub = frequencia de corte inferior
fcutSup = frequencia de corte superior
Q0 = fator central de qualidade (quanto maior o valor mais estreita é a banda)
FpassB = filtro passa baixa
FpassA = filtro passa alta
FpassF = filtro passa faixa
FrejF = filtro rejeita faixa


// frequencia de ressonância LC
fR = 1 / (2 * Math.PI * Math.sqrt(L * C));

// reatancia capacitiva fC
Xc = 1 / (2 * Math.PI * (f * C));

// reatância indutiva fL
Xl = (2 * Math.PI * (f * L));


// resistência total (série) / Xc Xl 
Req = (R + (Xc + Xl));

// resistência total (paralelo) / Xc Xl
Req = R * (Xl * Xc / Xl + Xc) / R+( Xl * Xc / Xl + Xc);

// radianos/s LC
w = Math.sqrt(1 / (L * C));

// ressonância RL 
Q = ((2 * Math.PI * f) * (L / R));

// fator Q com slope do filtro 
Q0 = ((f0 / fcutSup) - fcutSub);
*/