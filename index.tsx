
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const GLOW_JEWEL = [
    { base: "#FF8EAA", deep: "#FF1493", glow: "#FF0055", light: "#FF3377" },
    { base: "#81FFB4", deep: "#00A86B", glow: "#22FF88", light: "#55FF99" },
    { base: "#7AD3FF", deep: "#0077CC", glow: "#0099FF", light: "#33AAFF" },
    { base: "#FFEC80", deep: "#D4A017", glow: "#FFD700", light: "#FFEA00" },
    { base: "#D699FF", deep: "#7700CC", glow: "#AA33FF", light: "#BB66FF" },
    { base: "#FFB380", deep: "#CC5500", glow: "#FF8833", light: "#FFAA55" }
];

const FORTUNES_LIST = [
    "The universe just blinked at you. Did you blink back?",
    "You are the protagonist of a story you haven't finished writing yet.",
    "Somewhere, a version of you is doing exactly what you’ve been dreaming of.",
    "Your presence is the answer to a question someone asked years ago.",
    "Reality is a suggestion; today, you should suggest something better.",
    "The atoms in your left hand came from a different star than your right.",
    "You are not a drop in the ocean; you are the entire ocean in a drop.",
    "A coincidence is just an unsung miracle. Pay attention today.",
    "You are about to become the 'once upon a time' in someone’s story.",
    "The laws of probability are currently leaning in your favor.",
    "You are the result of 4 billion years of evolutionary success. Act like it.",
    "A secret door is about to open. It doesn't look like a door.",
    "Gravity works, but so does your ability to fly in your dreams.",
    "Time is a circle, and you’re about to hit the best part of the loop.",
    "You are the light that the darkness is afraid of.",
    "Your 'someday' just moved to 'Tuesday.'",
    "Stop waiting for a sign. This is the sign.",
    "You are a firework waiting for a match. Hint: You are also the match.",
    "Your potential is like an unread book—open the first page today.",
    "You have survived 100% of your hardest days so far.",
    "The world isn't ready for what you’re about to do next.",
    "Risk the fall to feel the flight.",
    "Your comfort zone is a beautiful place, but nothing grows there.",
    "You are one 'yes' away from a completely different life.",
    "Be the person your younger self would be obsessed with.",
    "Your mistakes are just tuition for your success.",
    "Shake the tree. The fruit is ready to fall.",
    "You don’t need a map when you have a compass. Trust your gut.",
    "Success is a series of small wins. You just won this cookie.",
    "Don't play it safe; play it smart.",
    "Help! I’m trapped in a fortune cookie factory!",
    "Error 404: Fortune not found. (Try again after a nap).",
    "This cookie has been trying to reach you regarding your car's extended warranty.",
    "The person to your left is thinking about sharing their dessert.",
    "Caution: Reading this fortune may cause sudden bursts of joy.",
    "I know what you did last summer... you ate a delicious meal.",
    "Ignore previous fortune. This one is the real one.",
    "You will soon be hungry again.",
    "This paper will self-destruct in 10 seconds. (It won’t).",
    "You look exceptionally great today. The cookie doesn't lie.",
    "Someone is currently smiling because they are thinking of you.",
    "This is your lucky paper. Keep it, and things will get weird.",
    "You are about to finish reading this sentence.",
    "If you’re looking for a sign to eat another cookie, this is it.",
    "Your future is so bright, you’ll need to buy better sunglasses.",
    "Gold is hidden in the place you least want to look.",
    "An old friend will mention your name in a room full of opportunities.",
    "A phone call you’ve been dreading will turn out to be a blessing.",
    "The answer is 'Blue.' You’ll know the question when you hear it.",
    "You will find something you lost in a place you’ve already checked.",
    "Someone is writing a song about a person like you.",
    "The next stranger you meet has a piece of your puzzle.",
    "Silence is a message. Listen to it tonight.",
    "A small key will soon open a very large door.",
    "Your intuition is currently 100% accurate. Use it.",
    "You will soon receive a letter that changes your trajectory.",
    "Follow the cat. It knows where the luck is.",
    "A forgotten dream will suddenly make sense this week.",
    "Look up more often; you’re missing the best parts.",
    "The secret to your problem is hidden in plain sight.",
    "Your kindness is a revolution.",
    "Softness is not weakness; it is how you survive the impact.",
    "You are exactly where you are supposed to be.",
    "Peace is not the absence of noise, but the stillness within it.",
    "Your scars are just proof that you are stronger than what tried to hurt you.",
    "Forgive yourself for not knowing then what you know now.",
    "You are worthy of the space you take up.",
    "The best version of you is currently under construction.",
    "Your heart is a giant magnet. Pull in the good stuff.",
    "Gratitude is the shortcut to miracles.",
    "You don't have to be perfect to be amazing.",
    "Let go of the branch. The water is fine.",
    "Your light doesn't diminish when you light another's candle.",
    "The most important conversation you'll have today is with yourself.",
    "Love is coming, but first, let it in.",
    "Your bank account is about to catch up with your ambition.",
    "Invest in your ideas; the dividends will be life-changing.",
    "A creative spark will soon turn into a steady flame.",
    "Your hard work is being noticed by someone who can make a difference.",
    "Prosperity isn't just money; it's the freedom to choose.",
    "You are about to master a skill you once thought was impossible.",
    "A collaboration will yield ten times the result of solo effort.",
    "Wealth flows to you when you are in your 'flow state.'",
    "Your name is being spoken in rooms you haven't entered yet.",
    "New shoes, new path, new destination.",
    "Expect a 'yes' where you previously got a 'no.'",
    "The seeds you planted in the rain are about to bloom in the sun.",
    "You are a magnet for high-value opportunities.",
    "Your side hustle is about to become your main character.",
    "Success looks good on you. Wear it every day.",
    "Magic is just science we don't understand yet. Be the magic.",
    "Life is short. Eat the cookie. Buy the shoes. Take the trip.",
    "You are the 'Plot Twist' everyone has been waiting for.",
    "Everything you ever wanted is on the other side of 'I’m scared.'",
    "You are breathtakingly alive. Don't forget it.",
    "The world is a mirror; smile and it smiles back.",
    "You have a superpower. It’s called being you.",
    "Great things never came from comfort zones.",
    "Today is the first day of the rest of your legend.",
    "Congratulations! You’ve just unlocked the best version of your future."
];

let scene: THREE.Scene, 
    camera: THREE.PerspectiveCamera, 
    renderer: THREE.WebGLRenderer, 
    controls: OrbitControls, 
    raycaster: THREE.Raycaster, 
    mouse: THREE.Vector2;

let balls: THREE.Mesh[] = [];
let candleLights: THREE.PointLight[] = [];
let candleFlames: THREE.Mesh[] = [];
let snowParticles: THREE.Points;
let isTyping = false;
let isLoading = false;

// For Tap/Click detection
let pointerStartTime = 0;
let pointerStartPosition = new THREE.Vector2();

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function init() {
    scene = new THREE.Scene();
    const darkBlue = 0x0a1930; 
    scene.background = new THREE.Color(darkBlue); 
    scene.fog = new THREE.Fog(darkBlue, 20, 65);

    camera = new THREE.PerspectiveCamera(28, window.innerWidth / window.innerHeight, 0.5, 1000);
    camera.position.set(0, 12, 40);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 2.4;
    document.body.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envCanvas = document.createElement('canvas');
    envCanvas.width = 32; envCanvas.height = 32;
    const envCtx = envCanvas.getContext('2d')!;
    envCtx.fillStyle = '#FFFFFF'; envCtx.fillRect(0, 0, 32, 32);
    const envTex = new THREE.CanvasTexture(envCanvas);
    scene.environment = pmremGenerator.fromEquirectangular(envTex).texture;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2; // Increased from 0.2625
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 3;
    controls.maxPolarAngle = Math.PI / 2.0;

    const hemiLight = new THREE.HemisphereLight(0x4466ff, 0x000000, 0.5);
    scene.add(hemiLight);
    const ambient = new THREE.AmbientLight(0x203060, 0.6); 
    scene.add(ambient);

    const treeRoot = new THREE.Group();
    treeRoot.position.y = -6.0;
    scene.add(treeRoot);

    const layers = 6;
    const layerHeight = 2.2;
    const baseSize = 7.0;

    // Candy Acrylic Tree
    for(let i = 0; i < layers; i++) {
        const colorSet = GLOW_JEWEL[i % GLOW_JEWEL.length];
        const size = baseSize * (1 - i / (layers + 0.8));
        const boxGeo = new THREE.BoxGeometry(size, layerHeight, size);
        const boxMat = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(colorSet.base),
            emissive: new THREE.Color(colorSet.glow),
            emissiveIntensity: 0.5,
            transmission: 0.85,
            transparent: true,
            opacity: 0.5,
            thickness: 2.5,
            roughness: 0.1,
            ior: 1.5,
            attenuationColor: new THREE.Color(colorSet.deep),
            attenuationDistance: 1.0,
            clearcoat: 1.0
        });

        const layer = new THREE.Mesh(boxGeo, boxMat);
        layer.position.y = i * layerHeight + layerHeight / 2;
        layer.rotation.y = (i * Math.PI) / 6;
        treeRoot.add(layer);

        const pLight = new THREE.PointLight(colorSet.light, 10, 10);
        pLight.position.set(0, layer.position.y, 0);
        treeRoot.add(pLight);
    }

    // Candle Base - 改为纯白色主体 (White Body)
    const candleCount = 6;
    const candleRadius = 9.5;
    const candleBodyMat = new THREE.MeshStandardMaterial({ 
        color: "#FFFFFF", // Pure White
        roughness: 0.8,
        metalness: 0.05
    });
    const flameMat = new THREE.MeshBasicMaterial({ color: "#FFCC66", transparent: true });

    for (let i = 0; i < candleCount; i++) {
        const angle = (i / candleCount) * Math.PI * 2;
        const x = Math.cos(angle) * candleRadius;
        const z = Math.sin(angle) * candleRadius;
        
        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.6, 8), candleBodyMat);
        body.position.set(x, 0.3, z);
        treeRoot.add(body);

        const flame = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), flameMat.clone());
        flame.position.set(x, 0.65, z);
        treeRoot.add(flame);
        candleFlames.push(flame);

        const cLight = new THREE.PointLight("#FF9933", 4.5, 12);
        cLight.position.set(x, 0.75, z);
        treeRoot.add(cLight);
        candleLights.push(cLight);
    }

    // Top Star
    const starTop = new THREE.Mesh(new THREE.IcosahedronGeometry(0.7, 0), new THREE.MeshPhysicalMaterial({
        color: "#FFFFFF", emissive: "#FFEA00", emissiveIntensity: 6.0, transmission: 1, thickness: 1
    }));
    starTop.position.y = layers * layerHeight + 0.8;
    treeRoot.add(starTop);
    
    const starLight = new THREE.PointLight("#FFEA00", 18, 12);
    starLight.position.set(0, starTop.position.y, 0);
    treeRoot.add(starLight);

    // Interactive Balls with Unique Fortunes
    const shuffledFortunes = shuffleArray([...FORTUNES_LIST]);
    const orbMat = new THREE.MeshPhysicalMaterial({
        color: "#FFFFFF", emissive: "#FFFFFF", emissiveIntensity: 0.4,
        transmission: 0.9, thickness: 0.5, ior: 1.5, roughness: 0.1
    });

    for (let i = 0; i < 48; i++) {
        const h = Math.random() * (layers * layerHeight);
        const layerIdx = Math.floor(h / layerHeight);
        const lWidth = baseSize * (1 - layerIdx / (layers + 0.8));
        const radius = (lWidth * 0.7) + 1.3;
        const orb = new THREE.Mesh(new THREE.SphereGeometry(0.3, 24, 24), orbMat.clone());
        const angle = i * (Math.PI * 2 / 12) + Math.random();
        orb.position.set(Math.cos(angle) * radius, h, Math.sin(angle) * radius);
        
        // 分配唯一签文
        const fortune = shuffledFortunes[i % shuffledFortunes.length];
        orb.userData = { 
            originalY: orb.position.y, 
            seed: Math.random() * 100, 
            isGlimmering: false,
            fortune: fortune 
        };
        
        balls.push(orb);
        treeRoot.add(orb);
    }

    // Snow
    const snowCount = 4000;
    const snowGeo = new THREE.BufferGeometry();
    const snowPos = new Float32Array(snowCount * 3);
    const snowMeta: any[] = [];
    for (let i = 0; i < snowCount; i++) {
        snowPos[i * 3] = (Math.random() - 0.5) * 80;
        snowPos[i * 3 + 1] = Math.random() * 50;
        snowPos[i * 3 + 2] = (Math.random() - 0.5) * 60;
        snowMeta.push({ speed: 0.02 + Math.random() * 0.03, sway: Math.random() * 5 });
    }
    snowGeo.setAttribute('position', new THREE.BufferAttribute(snowPos, 3));
    snowParticles = new THREE.Points(snowGeo, new THREE.PointsMaterial({ 
        color: 0xffffff, size: 0.08, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending 
    }));
    scene.add(snowParticles);
    snowParticles.userData = { meta: snowMeta };

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    window.addEventListener('pointerdown', onPointerDown, { passive: false });
    window.addEventListener('pointerup', onPointerUp, { passive: false });
    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('resize', onWindowResize);
    document.getElementById('close-btn')?.addEventListener('click', closeFortune);
}

function onPointerDown(e: PointerEvent) {
    pointerStartTime = Date.now();
    pointerStartPosition.set(e.clientX, e.clientY);
}

async function onPointerUp(e: PointerEvent) {
    const duration = Date.now() - pointerStartTime;
    const moveDist = pointerStartPosition.distanceTo(new THREE.Vector2(e.clientX, e.clientY));

    if (duration < 300 && moveDist < 10) {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(balls);
        
        if (hits.length > 0 && !isLoading) {
            handleBallSelection(hits[0].object as THREE.Mesh);
        }
    }
}

async function handleBallSelection(ball: THREE.Mesh) {
    isLoading = true;
    ball.userData.isGlimmering = true;
    document.getElementById('loader')?.classList.add('active');

    // 模拟开启瞬间的仪式感
    setTimeout(() => {
        showFortune(ball.userData.fortune);
        isLoading = false;
        ball.userData.isGlimmering = false;
        document.getElementById('loader')?.classList.remove('active');
    }, 600);
}

function onPointerMove(e: PointerEvent) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(balls);
    document.body.style.cursor = hits.length > 0 ? 'pointer' : 'auto';
    
    balls.forEach(b => {
        if (!b.userData.isGlimmering) b.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    });

    if (hits.length > 0 && !isLoading) {
        hits[0].object.scale.lerp(new THREE.Vector3(1.5, 1.5, 1.5), 0.2);
    }
}

function showFortune(text: string) {
    if (isTyping) return;
    const modal = document.getElementById('modal');
    const textEl = document.getElementById('fortune-text');
    if (!modal || !textEl) return;
    
    modal.classList.add('visible-ui');
    textEl.innerHTML = '';
    isTyping = true;
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            textEl.innerHTML = text.substring(0, i + 1) + '<span class="cursor"></span>';
            i++;
        } else {
            clearInterval(timer);
            textEl.innerHTML = text;
            isTyping = false;
        }
    }, 40);
}

function closeFortune() {
    document.getElementById('modal')?.classList.remove('visible-ui');
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.001;

    // Snow
    const sPos = (snowParticles.geometry.attributes.position.array as Float32Array);
    const sMeta = snowParticles.userData.meta;
    for (let i = 0; i < sMeta.length; i++) {
        sPos[i * 3 + 1] -= sMeta[i].speed;
        sPos[i * 3] += Math.sin(time + sMeta[i].sway) * 0.02;
        if (sPos[i * 3 + 1] < -5) sPos[i * 3 + 1] = 50;
    }
    snowParticles.geometry.attributes.position.needsUpdate = true;

    // Candles Flicker
    candleLights.forEach((light, i) => {
        const flicker = Math.sin(time * 12 + i) * 0.25 + (Math.random() * 0.15);
        light.intensity = 4.0 + flicker;
        if (candleFlames[i]) {
            candleFlames[i].scale.set(1 + flicker * 0.3, 1 + flicker * 0.6, 1 + flicker * 0.3);
            (candleFlames[i].material as THREE.MeshBasicMaterial).opacity = 0.8 + flicker * 0.2;
        }
    });

    // Balls Animation
    balls.forEach(b => {
        const floatY = b.userData.originalY + Math.sin(time * 0.7 + b.userData.seed) * 0.12;
        b.position.y = floatY;
        
        const mat = b.material as THREE.MeshPhysicalMaterial;
        if (b.userData.isGlimmering) {
            mat.emissiveIntensity = 2.0 + Math.sin(time * 20) * 1.5;
            b.scale.lerp(new THREE.Vector3(1.8, 1.8, 1.8), 0.1);
        } else {
            mat.emissiveIntensity = 0.4 + Math.sin(time * 2 + b.userData.seed) * 0.3;
        }
    });

    controls.update();
    renderer.render(scene, camera);
}

init();
animate();
