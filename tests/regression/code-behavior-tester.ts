import { Page } from '@playwright/test';

export interface CodeTestResult {
  success: boolean;
  originalOutput: any[];
  minifiedOutput: any[];
  unminifiedOutput: any[];
  error?: string;
}

export class CodeBehaviorTester {
  constructor(private page: Page) {}

  /**
   * Teste le comportement d'un code JavaScript avant et après minification/unminification
   */
  async testJavaScriptBehavior(originalCode: string): Promise<CodeTestResult> {
    try {
      // 1. Exécuter le code original et capturer les outputs
      const originalOutput = await this.executeCodeAndCaptureOutput(originalCode);
      
      // 2. Minifier le code
      const minifiedCode = await this.minifyJavaScript(originalCode);
      
      // 3. Exécuter le code minifié et capturer les outputs
      const minifiedOutput = await this.executeCodeAndCaptureOutput(minifiedCode);
      
      // 4. Unminifier le code minifié
      const unminifiedCode = await this.unminifyJavaScript(minifiedCode);
      
      // 5. Exécuter le code unminifié et capturer les outputs
      const unminifiedOutput = await this.executeCodeAndCaptureOutput(unminifiedCode);
      
      // 6. Comparer les résultats
      const success = this.compareOutputs(originalOutput, minifiedOutput) && 
                     this.compareOutputs(originalOutput, unminifiedOutput);

      return {
        success,
        originalOutput,
        minifiedOutput,
        unminifiedOutput
      };
    } catch (error) {
      return {
        success: false,
        originalOutput: [],
        minifiedOutput: [],
        unminifiedOutput: [],
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Exécute du code JavaScript dans le navigateur et capture les outputs console
   */
  private async executeCodeAndCaptureOutput(code: string): Promise<any[]> {
    const outputs: any[] = [];
    
    // Écouter les messages console
    this.page.on('console', msg => {
      if (msg.type() === 'log') {
        outputs.push(msg.text());
      }
    });

    // Exécuter le code dans le contexte de la page
    await this.page.evaluate(code);
    
    return outputs;
  }

  /**
   * Minifie du code JavaScript en utilisant l'API de l'application
   */
  private async minifyJavaScript(code: string): Promise<string> {
    // Simuler l'utilisation de l'API de minification
    return await this.page.evaluate(async (jsCode) => {
      // Ici on utiliserait l'API réelle de l'application
      // Pour l'instant, on simule avec une minification basique
      return jsCode
        .replace(/\s+/g, ' ')
        .replace(/;\s*}/g, '}')
        .trim();
    }, code);
  }

  /**
   * Unminifie du code JavaScript en utilisant l'API de l'application
   */
  private async unminifyJavaScript(code: string): Promise<string> {
    // Simuler l'utilisation de l'API d'unminification
    return await this.page.evaluate(async (jsCode) => {
      // Ici on utiliserait l'API réelle de l'application
      // Pour l'instant, on simule avec un unminification basique
      return jsCode
        .replace(/;/g, ';\n')
        .replace(/{/g, '{\n  ')
        .replace(/}/g, '\n}')
        .replace(/,/g, ',\n  ');
    }, code);
  }

  /**
   * Compare deux arrays d'outputs pour vérifier qu'ils sont identiques
   */
  private compareOutputs(output1: any[], output2: any[]): boolean {
    if (output1.length !== output2.length) {
      return false;
    }
    
    for (let i = 0; i < output1.length; i++) {
      if (output1[i] !== output2[i]) {
        return false;
      }
    }
    
    return true;
  }
}
