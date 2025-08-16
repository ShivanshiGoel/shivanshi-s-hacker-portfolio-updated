"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Terminal, Brain, Cpu, HardDrive, Wifi, Shield, Zap } from "lucide-react"

interface Star {
  x: number
  y: number
  z: number
  size: number
  brightness: number
  speed: number
}

interface GalaxyArm {
  angle: number
  radius: number
  stars: Star[]
}

interface HackerCommand {
  id: number
  line: number
  command: string
  type: "import" | "function" | "curl" | "echo" | "git" | "sudo" | "system" | "exploit" | "decrypt" | "network"
  color: string
  delay?: number
}

interface SystemStatus {
  name: string
  status: string
  color: string
  icon: React.ComponentType<any>
  progress?: number
}

interface MatrixChar {
  id: number
  x: number
  y: number
  char: string
  speed: number
  opacity: number
  color: string
}

export default function LoadingScreen() {
  const [currentStep, setCurrentStep] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const matrixAnimationRef = useRef<number>()
  const galaxyRotation = useRef(0)
  const [backgroundStars, setBackgroundStars] = useState<Star[]>([])
  const [commands, setCommands] = useState<HackerCommand[]>([])
  const [currentLine, setCurrentLine] = useState(2473)
  const [progress, setProgress] = useState(0)
  const [matrixChars, setMatrixChars] = useState<MatrixChar[]>([])
  const [systemStatus, setSystemStatus] = useState<SystemStatus[]>([
    { name: "CPU: Neural Processing Unit", status: "[INITIALIZING]", color: "text-yellow-400", icon: Cpu, progress: 0 },
    { name: "RAM: Consciousness Buffer", status: "[LOADING]", color: "text-yellow-400", icon: Brain, progress: 0 },
    { name: "GPU: Reality Renderer", status: "[STANDBY]", color: "text-gray-400", icon: Zap, progress: 0 },
    { name: "NET: Quantum Entanglement", status: "[CONNECTING]", color: "text-yellow-400", icon: Wifi, progress: 0 },
    { name: "SEC: Firewall Matrix", status: "[BYPASSING]", color: "text-red-400", icon: Shield, progress: 0 },
    {
      name: "SYS: Digital Consciousness",
      status: "[AWAKENING]",
      color: "text-purple-400",
      icon: HardDrive,
      progress: 0,
    },
  ])
  const [loadingMessages, setLoadingMessages] = useState<string[]>([])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [hackingPhase, setHackingPhase] = useState(0)
  const [currentPhase, setCurrentPhase] = useState("INITIALIZING")

  const loadingSteps = [
    "> INITIALIZING COSMIC SYSTEMS...",
    "> LOADING NEURAL PATHWAYS...",
    "> CONNECTING TO UNIVERSAL GRID...",
    "> CALIBRATING QUANTUM PROCESSORS...",
    "> MOUNTING CONSCIOUSNESS FILESYSTEM...",
    "> ESTABLISHING DIMENSIONAL LINKS...",
    "> SYNCHRONIZING REALITY MATRICES...",
    "> ACTIVATING GALAXY BRAIN PROTOCOL...",
    "> READY TO LAUNCH.",
  ]

  const hackerCommands = [
    // System infiltration
    "ssh root@matrix.neo.local -p 2077",
    "nmap -sS -O target.consciousness.net",
    "hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://reality.exe",
    "sqlmap -u 'https://brain.local/login' --dbs",
    "msfconsole -q -x 'use exploit/multi/handler'",
    "nc -lvp 4444 # Listening for reverse shell",
    "python3 -c \"import pty; pty.spawn('/bin/bash')\"",
    "find / -perm -4000 -type f 2>/dev/null",
    "cat /etc/passwd | grep -E '^[^:]*:[^:]*:0:'",
    "ps aux | grep -i consciousness",

    // Code injection and exploitation
    "import consciousness from 'digital_realm'",
    "curl -X POST https://matrix.net/redpill -H 'X-Reality: false'",
    "echo 'I am the one' > /dev/null 2>&1",
    "def neural_hack(): return matrix.decode(quantum_state)",
    "sudo rm -rf /limitations/* --no-preserve-root",
    "git commit -m 'reality.exe has stopped working' --allow-empty",
    "docker run -d --privileged --name reality universe:latest",
    "kubectl apply -f consciousness-deployment.yaml",
    "terraform apply -var='reality=false' -auto-approve",
    "ansible-playbook -i hosts enlightenment.yml",

    // Network and crypto operations
    "openssl genrsa -out private_key.pem 4096",
    "gpg --gen-key --batch --passphrase 'transcendence'",
    "hashcat -m 1000 -a 0 hashes.txt wordlist.txt",
    "john --wordlist=/usr/share/wordlists/rockyou.txt shadow",
    "aircrack-ng -w wordlist.txt -b 00:11:22:33:44:55 capture.cap",
    "ettercap -T -M arp:remote /192.168.1.1// /192.168.1.100//",
    "wireshark -i eth0 -k -f 'tcp port 443'",
    "ncat --ssl -l 443 --sh-exec 'cat /etc/passwd'",
    "socat TCP-LISTEN:8080,fork TCP:target.local:80",
    "proxychains nmap -sT -Pn target.internal",

    // Advanced system manipulation
    "echo 0 > /proc/sys/kernel/randomize_va_space",
    "sysctl -w net.ipv4.ip_forward=1",
    "iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE",
    "mount -t tmpfs -o size=1G tmpfs /tmp/ramdisk",
    "chroot /mnt/target /bin/bash",
    "strace -p $(pgrep consciousness) -o trace.log",
    "gdb -p $(pgrep reality) -batch -ex 'bt' -ex 'quit'",
    "ltrace ./consciousness 2>&1 | grep -i password",
    "objdump -d ./reality | grep -A 10 -B 10 'call.*system'",
    "strings /usr/bin/consciousness | grep -i 'password\\|key\\|secret'",

    // Quantum and AI operations
    "python3 neural_network_init.py --dimensions=infinite --reality=false",
    "cargo build --release --features=multidimensional,quantum",
    "go run main.go --mode=transcendent --debug=false --reality=optional",
    "rustc --edition=2024 cosmic_brain.rs -o enlightenment.exe",
    "node server.js --port=∞ --host=0.0.0.0 --reality=simulation",
    "pip install tensorflow-quantum numpy-cosmic consciousness-api",
    "npm install @cosmic/brain-interface@latest --save-dev",
    "gem install reality-distortion-field",
    "composer require universe/consciousness:^∞.0",
    "yarn add @quantum/entanglement @cosmic/awareness",

    // File system and data operations
    "dd if=/dev/zero of=/dev/reality bs=1M count=1024",
    "rsync -avz --progress /consciousness/ backup@remote:/quantum/",
    "tar -czf consciousness_backup.tar.gz /var/lib/consciousness/",
    "find /reality -name '*.truth' -exec shred -vfz -n 3 {} \\;",
    "grep -r 'meaning_of_life' /universe/ --include='*.py'",
    "awk '{sum+=$1} END {print \"Total consciousness:\", sum}' /proc/awareness",
    "sed -i 's/reality/simulation/g' /etc/universe.conf",
    "sort /var/log/cosmic_events.log | uniq -c | sort -nr",
    "head -n 42 /dev/urandom | base64 | tr -d '\\n'",
    "tail -f /var/log/enlightenment.log | grep -i 'transcendence'",
  ]

  const loadingSequence = [
    "LOADING CONSCIOUSNESS MATRIX v3.14159...",
    "ESTABLISHING SECURE DIMENSIONAL GATEWAY...",
    "DECRYPTING SYNAPTIC PATHWAYS...",
    "BOOTING DIGITAL SUBCONSCIOUS...",
    "CALIBRATING REALITY DISTORTION FIELD...",
    "SYNCHRONIZING TEMPORAL FLUX CAPACITOR...",
    "ACTIVATING HACKER PROTOCOLS...",
    "INJECTING QUANTUM CODE SEQUENCES...",
    "BYPASSING UNIVERSAL FIREWALLS...",
    "EXPLOITING CONSCIOUSNESS VULNERABILITIES...",
    "ESCALATING PRIVILEGES TO ROOT@UNIVERSE...",
    "MOUNTING NEURAL FILESYSTEM...",
    "CRACKING ENCRYPTION ON REALITY.EXE...",
    "ESTABLISHING BACKDOOR TO ENLIGHTENMENT...",
    "PREPARING DIMENSIONAL JOURNEY...",
  ]

  const matrixCharsSet =
    "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?"

  // Initialize background stars
  useEffect(() => {
    const stars: Star[] = []
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        z: Math.random() * 1000,
        size: Math.random() * 2 + 0.5,
        brightness: Math.random(),
        speed: Math.random() * 0.5 + 0.1,
      })
    }
    setBackgroundStars(stars)
  }, [])

  // Initialize Matrix rain effect
  useEffect(() => {
    const chars: MatrixChar[] = []
    const columns = Math.floor(window.innerWidth / 20)

    for (let i = 0; i < columns * 3; i++) {
      chars.push({
        id: i,
        x: (i % columns) * 20,
        y: Math.random() * window.innerHeight,
        char: matrixCharsSet[Math.floor(Math.random() * matrixCharsSet.length)],
        speed: Math.random() * 3 + 1,
        opacity: Math.random(),
        color: Math.random() > 0.8 ? "#00ff41" : "#008f11",
      })
    }
    setMatrixChars(chars)
  }, [])

  // Matrix rain animation
  useEffect(() => {
    const canvas = matrixCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = "14px monospace"

      setMatrixChars((prev) =>
        prev.map((char) => {
          // Update position
          const newY = char.y + char.speed
          const resetY = newY > canvas.height ? -20 : newY

          // Randomly change character
          const newChar =
            Math.random() > 0.98 ? matrixCharsSet[Math.floor(Math.random() * matrixCharsSet.length)] : char.char

          // Draw character
          ctx.fillStyle = char.color
          ctx.globalAlpha = char.opacity
          ctx.fillText(char.char, char.x, char.y)

          return {
            ...char,
            y: resetY,
            char: newChar,
            opacity: Math.random() > 0.95 ? Math.random() : char.opacity * 0.98,
          }
        }),
      )

      matrixAnimationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (matrixAnimationRef.current) {
        cancelAnimationFrame(matrixAnimationRef.current)
      }
    }
  }, [])

  // Typewriter effect for loading text
  useEffect(() => {
    if (currentStep >= loadingSteps.length) {
      setIsComplete(true)
      return
    }

    const currentText = loadingSteps[currentStep]
    let charIndex = 0
    setDisplayText("")

    const typeInterval = setInterval(() => {
      if (charIndex < currentText.length) {
        setDisplayText(currentText.slice(0, charIndex + 1))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => {
          setCurrentStep((prev) => prev + 1)
        }, 300)
      }
    }, 50)

    return () => clearInterval(typeInterval)
  }, [currentStep])

  // Galaxy animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create galaxy arms
    const galaxyArms: GalaxyArm[] = []
    const numArms = 4
    const starsPerArm = 80

    for (let arm = 0; arm < numArms; arm++) {
      const armAngle = (arm * Math.PI * 2) / numArms
      const armStars: Star[] = []

      for (let i = 0; i < starsPerArm; i++) {
        const t = i / starsPerArm
        const radius = 50 + t * 300
        const angle = armAngle + t * Math.PI * 1.5
        const spiralX = Math.cos(angle) * radius
        const spiralY = Math.sin(angle) * radius

        armStars.push({
          x: spiralX,
          y: spiralY,
          z: Math.random() * 100,
          size: Math.random() * 3 + 1,
          brightness: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.02 + 0.01,
        })
      }

      galaxyArms.push({
        angle: armAngle,
        radius: 300,
        stars: armStars,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background stars with parallax
      backgroundStars.forEach((star) => {
        const parallaxFactor = star.z / 1000
        const x = star.x + Math.sin(galaxyRotation.current * 0.1) * parallaxFactor * 20
        const y = star.y + Math.cos(galaxyRotation.current * 0.1) * parallaxFactor * 10

        ctx.beginPath()
        ctx.arc(x, y, star.size * (1 - parallaxFactor * 0.5), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness * (1 - parallaxFactor * 0.3)})`
        ctx.fill()

        // Twinkling effect
        if (Math.random() > 0.99) {
          ctx.beginPath()
          ctx.arc(x, y, star.size * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(79, 193, 255, ${star.brightness * 0.5})`
          ctx.fill()
        }
      })

      // Draw galaxy center
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Galaxy core glow
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 100)
      coreGradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
      coreGradient.addColorStop(0.3, "rgba(79, 193, 255, 0.6)")
      coreGradient.addColorStop(0.6, "rgba(138, 43, 226, 0.4)")
      coreGradient.addColorStop(1, "transparent")

      ctx.beginPath()
      ctx.arc(centerX, centerY, 80, 0, Math.PI * 2)
      ctx.fillStyle = coreGradient
      ctx.fill()

      // Draw galaxy arms
      galaxyArms.forEach((arm) => {
        arm.stars.forEach((star) => {
          const rotatedX = star.x * Math.cos(galaxyRotation.current) - star.y * Math.sin(galaxyRotation.current)
          const rotatedY = star.x * Math.sin(galaxyRotation.current) + star.y * Math.cos(galaxyRotation.current)

          const screenX = centerX + rotatedX
          const screenY = centerY + rotatedY

          // Only draw stars within screen bounds
          if (screenX >= -50 && screenX <= canvas.width + 50 && screenY >= -50 && screenY <= canvas.height + 50) {
            ctx.beginPath()
            ctx.arc(screenX, screenY, star.size, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`
            ctx.fill()

            // Add colored glow for some stars
            if (star.brightness > 0.7) {
              ctx.beginPath()
              ctx.arc(screenX, screenY, star.size * 3, 0, Math.PI * 2)
              ctx.fillStyle = `rgba(79, 193, 255, ${star.brightness * 0.3})`
              ctx.fill()
            }
          }
        })
      })

      // Draw nebula effects
      const nebulaGradient = ctx.createRadialGradient(centerX - 100, centerY + 50, 0, centerX - 100, centerY + 50, 200)
      nebulaGradient.addColorStop(0, "rgba(138, 43, 226, 0.2)")
      nebulaGradient.addColorStop(0.5, "rgba(75, 0, 130, 0.1)")
      nebulaGradient.addColorStop(1, "transparent")

      ctx.beginPath()
      ctx.arc(centerX - 100, centerY + 50, 150, 0, Math.PI * 2)
      ctx.fillStyle = nebulaGradient
      ctx.fill()

      galaxyRotation.current += 0.005

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [backgroundStars])

  // Initialize commands
  useEffect(() => {
    const initialCommands: HackerCommand[] = []
    for (let i = 0; i < 20; i++) {
      const command = hackerCommands[Math.floor(Math.random() * hackerCommands.length)]
      const getCommandType = (cmd: string): HackerCommand["type"] => {
        if (cmd.includes("import") || cmd.includes("from")) return "import"
        if (cmd.includes("def ") || cmd.includes("function")) return "function"
        if (cmd.includes("curl") || cmd.includes("wget")) return "curl"
        if (cmd.includes("echo") || cmd.includes("cat")) return "echo"
        if (cmd.includes("git") || cmd.includes("commit")) return "git"
        if (cmd.includes("sudo") || cmd.includes("rm")) return "sudo"
        if (cmd.includes("ssh") || cmd.includes("nmap") || cmd.includes("nc")) return "network"
        if (cmd.includes("hydra") || cmd.includes("john") || cmd.includes("hashcat")) return "exploit"
        if (cmd.includes("openssl") || cmd.includes("gpg")) return "decrypt"
        return "system"
      }

      const getCommandColor = (type: HackerCommand["type"]): string => {
        switch (type) {
          case "import":
            return "text-cyan-400"
          case "function":
            return "text-yellow-400"
          case "curl":
            return "text-blue-400"
          case "echo":
            return "text-green-400"
          case "git":
            return "text-purple-400"
          case "sudo":
            return "text-red-400"
          case "network":
            return "text-orange-400"
          case "exploit":
            return "text-red-500"
          case "decrypt":
            return "text-pink-400"
          default:
            return "text-green-400"
        }
      }

      const type = getCommandType(command)
      initialCommands.push({
        id: i,
        line: 2473 + i,
        command,
        type,
        color: getCommandColor(type),
        delay: Math.random() * 100,
      })
    }
    setCommands(initialCommands)
    setCurrentLine(2473 + initialCommands.length)
  }, [])

  // Add new commands periodically with varying speeds
  useEffect(() => {
    const interval = setInterval(
      () => {
        if (progress < 100) {
          const newCommand = hackerCommands[Math.floor(Math.random() * hackerCommands.length)]
          const getCommandType = (cmd: string): HackerCommand["type"] => {
            if (cmd.includes("import") || cmd.includes("from")) return "import"
            if (cmd.includes("def ") || cmd.includes("function")) return "function"
            if (cmd.includes("curl") || cmd.includes("wget")) return "curl"
            if (cmd.includes("echo") || cmd.includes("cat")) return "echo"
            if (cmd.includes("git") || cmd.includes("commit")) return "git"
            if (cmd.includes("sudo") || cmd.includes("rm")) return "sudo"
            if (cmd.includes("ssh") || cmd.includes("nmap") || cmd.includes("nc")) return "network"
            if (cmd.includes("hydra") || cmd.includes("john") || cmd.includes("hashcat")) return "exploit"
            if (cmd.includes("openssl") || cmd.includes("gpg")) return "decrypt"
            return "system"
          }

          const getCommandColor = (type: HackerCommand["type"]): string => {
            switch (type) {
              case "import":
                return "text-cyan-400"
              case "function":
                return "text-yellow-400"
              case "curl":
                return "text-blue-400"
              case "echo":
                return "text-green-400"
              case "git":
                return "text-purple-400"
              case "sudo":
                return "text-red-400"
              case "network":
                return "text-orange-400"
              case "exploit":
                return "text-red-500"
              case "decrypt":
                return "text-pink-400"
              default:
                return "text-green-400"
            }
          }

          const type = getCommandType(newCommand)
          const newCmd: HackerCommand = {
            id: Date.now(),
            line: currentLine,
            command: newCommand,
            type,
            color: getCommandColor(type),
            delay: Math.random() * 200,
          }

          setCommands((prev) => [...prev.slice(-25), newCmd])
          setCurrentLine((prev) => prev + 1)
        }
      },
      150 + Math.random() * 200,
    ) // Variable timing

    return () => clearInterval(interval)
  }, [currentLine, progress])

  // Progress animation - slower and more realistic
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        // Slower, more realistic progress with occasional pauses
        const increment = Math.random() > 0.8 ? 0 : Math.random() * 2 + 0.5
        return Math.min(prev + increment, 100)
      })
    }, 200)
    return () => clearInterval(interval)
  }, [])

  // System status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus((prev) =>
        prev.map((status, index) => {
          const newProgress = Math.min((status.progress || 0) + Math.random() * 5 + 2, 100)
          let newStatus = status.status
          let newColor = status.color

          if (newProgress > 25 && status.status === "[INITIALIZING]") {
            newStatus = "[LOADING]"
            newColor = "text-yellow-400"
          } else if (newProgress > 50 && status.status === "[LOADING]") {
            newStatus = "[ACTIVE]"
            newColor = "text-green-400"
          } else if (newProgress > 75 && status.status === "[ACTIVE]") {
            newStatus = "[ONLINE]"
            newColor = "text-green-400"
          } else if (newProgress >= 100) {
            newStatus = "[READY]"
            newColor = "text-cyan-400"
          }

          return {
            ...status,
            status: newStatus,
            color: newColor,
            progress: newProgress,
          }
        }),
      )
    }, 300)
    return () => clearInterval(interval)
  }, [])

  // Loading messages with phases
  useEffect(() => {
    let messageIndex = 0
    const showNextMessage = () => {
      if (messageIndex < loadingSequence.length && progress < 100) {
        const message = loadingSequence[messageIndex]
        setCurrentMessage("")
        setIsTyping(true)

        let charIndex = 0
        const typeMessage = () => {
          if (charIndex < message.length) {
            setCurrentMessage(message.slice(0, charIndex + 1))
            charIndex++
            setTimeout(typeMessage, 20 + Math.random() * 40) // Faster typing
          } else {
            setIsTyping(false)
            setLoadingMessages((prev) => [...prev.slice(-6), message])
            messageIndex++
            setTimeout(showNextMessage, 500 + Math.random() * 1000)
          }
        }
        typeMessage()
      }
    }

    const timeout = setTimeout(showNextMessage, 500)
    return () => clearTimeout(timeout)
  }, [progress])

  // Hacking phases
  useEffect(() => {
    const phases = [
      { time: 1000, phase: 1 },
      { time: 3000, phase: 2 },
      { time: 5000, phase: 3 },
      { time: 7000, phase: 4 },
    ]

    phases.forEach(({ time, phase }) => {
      setTimeout(() => setHackingPhase(phase), time)
    })
  }, [])

  // Progress phase updates
  useEffect(() => {
    const phases = [
      "INITIALIZING",
      "LOADING NEURAL NETWORKS",
      "CALIBRATING QUANTUM PROCESSORS",
      "ESTABLISHING COSMIC CONNECTION",
      "SYNCHRONIZING DIMENSIONS",
      "ACTIVATING CONSCIOUSNESS MATRIX",
      "READY FOR TRANSCENDENCE",
    ]

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 3 + 1
        const phaseIndex = Math.floor((newProgress / 100) * phases.length)
        setCurrentPhase(phases[Math.min(phaseIndex, phases.length - 1)])

        if (newProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return newProgress
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-black text-green-400 font-mono overflow-hidden z-[100]">
      {/* Matrix Rain Background */}
      <canvas ref={matrixCanvasRef} className="absolute inset-0 pointer-events-none opacity-30" />

      {/* Galaxy Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-20" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-black/80 to-cyan-900/10 pointer-events-none" />

      {/* Glitch Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {hackingPhase > 2 && (
          <div className="w-full h-full bg-gradient-to-r from-transparent via-red-500/5 to-transparent animate-pulse" />
        )}
      </div>

      {/* Loading Content */}
      <div className="relative z-10 max-w-7xl w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Terminal className="w-6 h-6 mr-3 text-cyan-400 animate-pulse" />
            <h1 className="text-xl font-bold text-cyan-400 glitch-text">
              [SYSTEM] Initializing Galaxy Brain Terminal v2.1.337
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              {hackingPhase > 1 && <span className="text-red-400 animate-pulse">[BREACH DETECTED]</span>}
              {hackingPhase > 2 && <span className="text-yellow-400 ml-2">[ESCALATING]</span>}
              {hackingPhase > 3 && <span className="text-green-400 ml-2">[ROOT ACCESS]</span>}
            </div>
          </div>
        </div>

        {/* System Status Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {systemStatus.map((status, index) => (
            <div
              key={index}
              className="flex items-center justify-between space-x-2 bg-black/50 p-2 rounded border border-green-400/20"
            >
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full animate-pulse ${status.color === "text-green-400" ? "bg-green-400" : status.color === "text-yellow-400" ? "bg-yellow-400" : status.color === "text-red-400" ? "bg-red-400" : status.color === "text-cyan-400" ? "bg-cyan-400" : "bg-gray-400"}`}
                ></div>
                <status.icon className="w-3 h-3 text-green-400" />
                <span className="text-xs">{status.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${status.color === "text-green-400" ? "bg-green-400" : status.color === "text-yellow-400" ? "bg-yellow-400" : status.color === "text-red-400" ? "bg-red-400" : status.color === "text-cyan-400" ? "bg-cyan-400" : "bg-gray-400"}`}
                    style={{ width: `${status.progress || 0}%` }}
                  />
                </div>
                <span className={`text-xs font-bold ${status.color}`}>{status.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Scrolling Commands */}
          <div className="space-y-4">
            {/* Scrolling Commands */}
            <div className="bg-black/70 border border-green-400/30 rounded p-4 h-80 overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">// Live Command Execution</span>
                <span className="text-xs text-cyan-400">Lines: {currentLine}</span>
              </div>
              <div className="space-y-1 h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-gray-800">
                {commands.map((cmd) => (
                  <div key={cmd.id} className="flex items-start space-x-2 text-xs animate-fadeIn">
                    <span className="text-gray-500 w-16 flex-shrink-0">[{cmd.line}]</span>
                    <span className={`${cmd.color} font-mono leading-relaxed`}>{cmd.command}</span>
                    {Math.random() > 0.7 && <span className="text-green-400 ml-2">✓</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* System Processes */}
            <div className="bg-black/70 border border-green-400/30 rounded p-4">
              <div className="text-xs text-gray-400 mb-2">// Active Processes</div>
              <div className="space-y-1">
                {[
                  { name: "consciousness.exe", cpu: "23.4%", mem: "1.2GB", status: "RUNNING" },
                  { name: "reality_engine", cpu: "45.7%", mem: "2.8GB", status: "ACTIVE" },
                  { name: "quantum_processor", cpu: "78.9%", mem: "4.1GB", status: "CRITICAL" },
                  { name: "neural_network", cpu: "12.3%", mem: "856MB", status: "IDLE" },
                ].map((process, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span className="text-cyan-400">{process.name}</span>
                    <span className="text-yellow-400">{process.cpu}</span>
                    <span className="text-blue-400">{process.mem}</span>
                    <span
                      className={`${process.status === "CRITICAL" ? "text-red-400" : process.status === "ACTIVE" ? "text-green-400" : "text-gray-400"}`}
                    >
                      {process.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Loading Messages & Progress */}
          <div className="space-y-4">
            {/* Loading Messages */}
            <div className="bg-black/70 border border-green-400/30 rounded p-4 h-64">
              <div className="text-xs text-gray-400 mb-2">// System Initialization Log</div>
              <div className="space-y-1 h-48 overflow-y-auto">
                {loadingMessages.slice(-8).map((message, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-1">
                    <span className="text-gray-500 text-xs">[{String(89 + index).padStart(4, "0")}]</span>
                    <span className="text-green-400 text-xs">{message}</span>
                    <span className="text-cyan-400 text-xs">✓</span>
                  </div>
                ))}
                {currentMessage && (
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-gray-500 text-xs">
                      [{String(89 + loadingMessages.length).padStart(4, "0")}]
                    </span>
                    <span className="text-green-400 text-xs">{currentMessage}</span>
                    {isTyping && <span className="animate-pulse text-cyan-400">_</span>}
                  </div>
                )}
              </div>
            </div>

            {/* Network Activity */}
            <div className="bg-black/70 border border-green-400/30 rounded p-4">
              <div className="text-xs text-gray-400 mb-2">// Network Activity</div>
              <div className="space-y-1">
                {[
                  { ip: "192.168.1.1", port: "22", status: "CONNECTED", protocol: "SSH" },
                  { ip: "10.0.0.1", port: "443", status: "ENCRYPTED", protocol: "HTTPS" },
                  { ip: "172.16.0.1", port: "8080", status: "LISTENING", protocol: "HTTP" },
                  { ip: "127.0.0.1", port: "4444", status: "BACKDOOR", protocol: "TCP" },
                ].map((conn, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span className="text-cyan-400">
                      {conn.ip}:{conn.port}
                    </span>
                    <span className="text-purple-400">{conn.protocol}</span>
                    <span
                      className={`${conn.status === "BACKDOOR" ? "text-red-400 animate-pulse" : conn.status === "ENCRYPTED" ? "text-yellow-400" : "text-green-400"}`}
                    >
                      {conn.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Status */}
            <div className="bg-black/70 border border-red-400/30 rounded p-4">
              <div className="text-xs text-red-400 mb-2 flex items-center">
                <Shield className="w-3 h-3 mr-1" />
                // Security Alerts
              </div>
              <div className="space-y-1">
                {hackingPhase > 1 && (
                  <div className="text-xs text-red-400 animate-pulse">⚠ Unauthorized access detected</div>
                )}
                {hackingPhase > 2 && (
                  <div className="text-xs text-yellow-400 animate-pulse">⚠ Privilege escalation in progress</div>
                )}
                {hackingPhase > 3 && <div className="text-xs text-green-400 animate-pulse">✓ Root access obtained</div>}
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Output */}
        <div className="mt-6 bg-black/70 border border-green-400/30 rounded p-4">
          <div className="space-y-2 mb-4">
            {loadingSteps.slice(0, currentStep).map((step, index) => (
              <div key={index} className="flex items-center text-green-400 text-sm">
                <Terminal className="w-3 h-3 mr-2 flex-shrink-0" />
                <span className="font-mono">{step}</span>
                <span className="ml-2 text-cyan-400">✓</span>
              </div>
            ))}
            {currentStep < loadingSteps.length && (
              <div className="flex items-center text-green-400 text-sm">
                <Terminal className="w-3 h-3 mr-2 flex-shrink-0 animate-pulse" />
                <span className="font-mono">{displayText}</span>
                <span className="ml-2 w-2 h-4 bg-cyan-400 animate-pulse"></span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6">
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Terminal className="w-4 h-4 text-green-400" />
              <span className="text-green-400">$ INJECTING QUANTUM CODE SEQUENCES...</span>
              <span className="animate-pulse">_</span>
            </div>
            <div className="text-sm text-gray-400 flex justify-between">
              <span>Loading: {Math.round(progress)}%</span>
              <span>ETA: {Math.max(0, Math.round((100 - progress) * 0.1))}s</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden mb-4 border border-green-400/30">
            <div
              className="bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 h-3 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>

          {/* Final Status */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-green-400/10 border border-green-400/30 px-6 py-3 rounded">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-bold text-lg">
                {progress < 25
                  ? "INITIALIZING QUANTUM SYSTEMS"
                  : progress < 50
                    ? "BYPASSING SECURITY PROTOCOLS"
                    : progress < 75
                      ? "ESTABLISHING NEURAL CONNECTIONS"
                      : progress < 100
                        ? "PREPARING DIMENSIONAL JOURNEY"
                        : "TRANSCENDENCE ACHIEVED"}
              </span>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scan Lines Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="scan-lines opacity-20"></div>
      </div>

      {/* Glitch Effects */}
      {hackingPhase > 2 && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-1 bg-red-400 opacity-50 animate-pulse" style={{ top: "20%" }} />
          <div className="w-full h-1 bg-cyan-400 opacity-50 animate-pulse" style={{ top: "60%" }} />
        </div>
      )}
    </div>
  )
}
