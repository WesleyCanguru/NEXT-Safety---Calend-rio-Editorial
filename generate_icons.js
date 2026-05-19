import { Jimp } from 'jimp';
import https from 'https';
import fs from 'fs';

const url = 'https://i.postimg.cc/wj77zF1y/Canguru-Digital-Favicon-Bolsa.png';
const tempFile = 'public/temp_base.png';

if (!fs.existsSync('public')) {
    fs.mkdirSync('public', { recursive: true });
}

console.log('Baixando imagem de base em alta resolução (ESM)...');
const file = fs.createWriteStream(tempFile);

https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
        file.close(async () => {
            console.log('Imagem de base baixada. Iniciando processamento de resoluções com Jimp v1.x...');
            try {
                const image = await Jimp.read(tempFile);
                
                // 1. Apple Touch Icon padrão (180x180) - para iPads, iPhones retina, etc.
                console.log('Gerando public/apple-touch-icon.png (180x180)...');
                const appleTouch = image.clone();
                appleTouch.resize({ w: 180, h: 180 });
                await appleTouch.write('public/apple-touch-icon.png');
                
                // 2. Favicon 32x32 (Para abas de navegadores desktop e favoritos)
                console.log('Gerando public/favicon-32x32.png (32x32)...');
                const fav32 = image.clone();
                fav32.resize({ w: 32, h: 32 });
                await fav32.write('public/favicon-32x32.png');
                
                // 3. Favicon 16x16 (Para navegadores legados ou visualizações pequenas)
                console.log('Gerando public/favicon-16x16.png (16x16)...');
                const fav16 = image.clone();
                fav16.resize({ w: 16, h: 16 });
                await fav16.write('public/favicon-16x16.png');
                
                // 4. Icon 192x192 (PWA celular)
                console.log('Gerando public/icon-192.png (192x192)...');
                const icon192 = image.clone();
                icon192.resize({ w: 192, h: 192 });
                await icon192.write('public/icon-192.png');
                
                // 5. Icon 512x512 (PWA splashscreen)
                console.log('Gerando public/icon-512.png (512x512)...');
                const icon512 = image.clone();
                icon512.resize({ w: 512, h: 512 });
                await icon512.write('public/icon-512.png');

                // 6. Favicon.ico copia do PNG de 32x32 por compatibilidade
                console.log('Gerando public/favicon.ico via cópia física de PNG 32x32...');
                fs.copyFileSync('public/favicon-32x32.png', 'public/favicon.ico');

                // Remover arquivo temporário de alta resolução
                try {
                    fs.unlinkSync(tempFile);
                } catch (e) {}
                
                console.log('Sucesso absoluto! Todos os arquivos de ícones físicos digitais foram perfeitamente gerados e otimizados na pasta public/.');
            } catch (err) {
                console.error('Falha crítica ao processar imagens via Jimp:', err);
            }
        });
    });
}).on('error', (err) => {
    console.error('Falha de rede ao baixar imagem da URL:', err);
});
